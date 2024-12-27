import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/order.entity';
import { STATUS_ORDER } from '../enumTypes/status_order/status_order.enum';
import { Payment } from './payment.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class PaymentService {
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
    @InjectRepository(Order) private readonly OrderRepo: Repository<Order>,
    @InjectRepository(Payment)
    private readonly PaymentRepo: Repository<Payment>,
  ) {}

  async updateOrder(orderId: number, statusCode: string) {
    const orderExisting: Order = await this.OrderRepo.findOne({
      where: { id: orderId },
      relations: [
        'user',
        'theater',
        'showtime',
        'theater.theater_complex',
        'showtime.movie',
      ], // Đảm bảo có các relation cần thiết
    });

    if (!orderExisting) {
      throw new NotFoundException('Not found orderId');
    }

    // Cập nhật trạng thái đơn hàng
    orderExisting.status =
      statusCode === '00' ? STATUS_ORDER.ORDERED : STATUS_ORDER.CANCELED;

    // Tạo bản ghi Payment
    const payment = this.PaymentRepo.create({
      method: 'VNPay',
      status: statusCode === '00' ? 'SUCCESS' : 'FAILED',
      order: orderExisting,
    });

    try {
      await this.OrderRepo.save(orderExisting);
      await this.PaymentRepo.save(payment);

      // Kiểm tra và lấy thông tin người dùng
      const userEmail = orderExisting.user?.email;
      if (!userEmail) {
        throw new BadRequestException('User email is not available.');
      }

      await this.sendMailQueue.add('confirm-order', {
        to: userEmail,
        customerName: orderExisting.user.fullName || 'null',
        cinema: orderExisting.theater.theater_complex.name || 'null',
        address: orderExisting.theater.theater_complex.address || 'null',
        theater: orderExisting.theater?.name || 'null',
        showtime: orderExisting.showtime?.showtime_start || 'null',
        movieName: orderExisting.showtime.movie.title || 'null',
        foods: orderExisting.foods || 'null',
        totalPrice: orderExisting.total_price || 'null',
        status: orderExisting.status || 'null',
      });

      return `http://localhost:5173/payment/confirm/order/${orderExisting.id}`;
    } catch (err) {
      console.error(err); // Ghi log lỗi
      throw new BadRequestException(
        'An error occurred, please try again later.',
      );
    }
  }

  async createPayment(orderId: number) {
    const existingOrder = await this.OrderRepo.findOne({
      where: { id: orderId },
    });

    if (!existingOrder) {
      throw new NotFoundException('Not found orderId');
    }

    const newPayment = this.PaymentRepo.create({
      status: 'pending',
      method: 'vnpay',
      order: existingOrder, // Liên kết payment với order
    });

    await this.PaymentRepo.save(newPayment);

    return {
      paymentId: newPayment.id,
    };
  }
}
