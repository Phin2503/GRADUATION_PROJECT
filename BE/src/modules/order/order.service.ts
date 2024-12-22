import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { In, Repository } from 'typeorm';
import { Seat } from '../seat/seat.entity';
import { Showtime } from '../showtime/showtime.entity';
import { Theater } from '../theater/theater.entity';
import { User } from '../user/user.entity';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { STATUS_ORDER } from '../enumTypes/status_order/status_order.enum';
import { updateOrderDTO } from './dtos/updateOrder.dto';
import { Coupon } from '../coupon/coupon.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Showtime)
    private readonly showtimeRepo: Repository<Showtime>,
    @InjectRepository(Theater)
    private readonly theaterRepo: Repository<Theater>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  async createOrder(
    theaterId: number,
    showtimeId: number,
    requestBody: CreateOrderDTO,
  ) {
    if (requestBody.seats.length === 0)
      throw new BadRequestException("The 'seats' field cannot be empty!");

    const validateOrder = await this.validateOrder(
      requestBody.userId,
      theaterId,
      showtimeId,
    );

    const existingOrders = await this.orderRepo.findBy({
      showtime: {
        id: showtimeId,
      },
    });

    const bookedSeats: string[] = existingOrders.flatMap(
      (order) => order.seats,
    );
    const alreadyBookedSeats = requestBody.seats.filter((seat) =>
      bookedSeats.includes(seat),
    );

    if (alreadyBookedSeats.length > 0) {
      throw new BadRequestException(
        `Seat ${alreadyBookedSeats.join(', ')} already ordered!`,
      );
    }
    const order = await this.orderRepo.create(requestBody);

    order.user = (await validateOrder).user;
    order.theater = (await validateOrder).theater;
    order.showtime = (await validateOrder).showtime;
    order.seats = requestBody.seats;
    order.foods = requestBody.foods;
    if (requestBody.couponId) {
      const existingCoupon = await this.couponRepo.findOneBy({
        id: requestBody.couponId,
      });

      if (!existingCoupon) {
        throw new NotFoundException('Not found coupon or expired !!');
      }

      order.coupon = existingCoupon;
    }

    const newOrder = await this.orderRepo.save(order);

    this.autoDeleteOrderCancelled(newOrder.id);

    return newOrder;
  }

  // @Cron('0 4 * * *')
  // async deteleOrders() {
  //   try {
  //     await this.orderRepo.clear();
  //   } catch (e) {
  //     throw new BadRequestException('Something went wrong !');
  //   }
  // }

  async getOrderByID(orderId: number) {
    const existingOrder = await this.orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: ['theater', 'user', 'showtime'],
    });

    console.log(existingOrder);

    const showtimeOfOrder = await this.showtimeRepo.findOne({
      where: {
        id: existingOrder.showtime.id,
      },
      relations: ['theater_complex', 'movie'],
    });

    console.log(showtimeOfOrder);

    if (!existingOrder) {
      throw new NotFoundException('Not found Order ! try again');
    }

    return { existingOrder, showtimeOfOrder };
  }

  async getSeatOrdered(theaterId: number, showtimeId: number) {
    const ordered = await this.orderRepo.find({
      where: {
        showtime: {
          id: showtimeId,
        },
        status: In([STATUS_ORDER.PENDING, STATUS_ORDER.ORDERED]),
      },
      select: ['seats'],
    });

    const listSeatsOrdered: string[] = ordered.flatMap((order) => order.seats);

    return listSeatsOrdered;
  }

  async getSeatOrderedByOrderId(showtimeId: number, orderId: number) {
    const seatsOfOrder = await this.orderRepo.findOne({
      where: {
        id: orderId,
        status: In([STATUS_ORDER.ORDERED, STATUS_ORDER.PENDING]),
      },
      select: ['seats'],
    });

    const showtime = await this.showtimeRepo.findOneBy({
      id: showtimeId,
    });

    if (!showtime) {
      throw new NotFoundException('Order not found or showtime not found');
    }

    const seatsOrdered = await this.orderRepo.find({
      where: {
        showtime: {
          id: showtimeId,
        },
        status: In([STATUS_ORDER.ORDERED, STATUS_ORDER.PENDING]),
      },
      select: ['seats'],
    });

    const allSeats = seatsOrdered.map((order) => order.seats).flat();

    return {
      seatsOfOrder: seatsOfOrder.seats,
      seatsOrdered: allSeats,
    };
  }

  async autoDeleteOrderCancelled(id: number) {
    const delay = 7 * 60 * 1000; // 1 phút

    await new Promise((resolve) => setTimeout(resolve, delay));

    const result = await this.orderRepo
      .createQueryBuilder()
      .delete()
      .where('id = :id AND status IN (:...statuses)', {
        id: id,
        statuses: [STATUS_ORDER.PENDING, STATUS_ORDER.CANCELED],
      })
      .execute();
  }

  async updateOrder(orderId: number, requestBody: updateOrderDTO) {
    const Order = await this.orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: ['showtime'],
    });

    requestBody.seats.forEach((seat) => {
      if (seat.length == 0) throw new BadRequestException('Invalid seat !');
    });

    if (!Order) throw new NotFoundException('Not found this order !');

    const showtimeId = Order.showtime.id;

    const { seatsOfOrder, seatsOrdered } = await this.getSeatOrderedByOrderId(
      showtimeId,
      orderId,
    );

    const filteredSeats = seatsOrdered.filter(
      (seat) => !seatsOfOrder.includes(seat),
    );

    const check = requestBody.seats.filter((seat) =>
      filteredSeats.includes(seat),
    );

    if (check.length > 0) {
      throw new BadRequestException(
        `Seat ${check.join(', ')} already ordered!`,
      );
    }

    const orderUpdate = { ...Order, ...requestBody };

    try {
      return await this.orderRepo.save(orderUpdate);
    } catch (err) {
      throw new BadRequestException('Something went wrong !');
    }
  }

  async getOrdersByUserId(userId: string) {
    const existingUser = await this.userRepo.findOneBy({
      id: userId,
    });

    if (!existingUser) {
      throw new NotFoundException('Not found user !');
    }

    const Orders = await this.orderRepo.find({
      where: {
        user: {
          id: existingUser.id,
        },
      },
      relations: [
        'theater',
        'user',
        'showtime',
        'theater.theater_complex',
        'showtime.movie',
      ],
    });

    return Orders;
  }

  async validateOrder(userId: string, theaterId: number, showtimeId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException("User doesn't exist!");
    }

    const showtime = await this.showtimeRepo.findOne({
      where: {
        id: showtimeId,
      },
    });

    if (!showtime) throw new BadRequestException("Showtime doesn't exist!");

    const theater = await this.theaterRepo.findOne({
      where: {
        id: theaterId,
      },
    });

    if (!theater) throw new BadRequestException("Theater doesn't exist!");

    return {
      user,
      theater,
      showtime,
    };
  }
}
