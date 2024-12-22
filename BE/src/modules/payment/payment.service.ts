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

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Order) private readonly OrderRepo: Repository<Order>,
    @InjectRepository(Payment)
    private readonly PaymentRepo: Repository<Payment>,
  ) {}

  async updateOrder(orderId: number, statusCode: string) {
    const orderExisting: Order = await this.OrderRepo.findOne({
      where: { id: orderId },
    });

    if (!orderExisting) {
      throw new NotFoundException('Not found orderId');
    }

    // Cập nhật trạng thái đơn hàng
    if (statusCode == '00') {
      orderExisting.status = STATUS_ORDER.ORDERED;
    } else {
      orderExisting.status = STATUS_ORDER.CANCELED;
    }

    // Tạo bản ghi Payment
    const payment = this.PaymentRepo.create({
      method: 'VNPay',
      status: statusCode === '00' ? 'SUCCESS' : 'FAILED',
      order: orderExisting,
    });

    try {
      await this.OrderRepo.save(orderExisting);
      await this.PaymentRepo.save(payment);

      return `http://localhost:5174/payment/confirm/order/${orderExisting.id}`;
    } catch (err) {
      throw new BadRequestException(
        'An error occurred, please try again later.',
      );
    }
  }

  async createPayment(orderId: number) {
    // Kiểm tra xem đơn hàng có tồn tại không
    const existingOrder = await this.OrderRepo.findOne({
      where: { id: orderId },
    });

    if (!existingOrder) {
      throw new NotFoundException('Not found orderId');
    }

    const newPayment = this.PaymentRepo.create({
      status: 'pending',
      method: 'vnpay',
      // order: existingOrder,
    });

    await this.PaymentRepo.save(newPayment);

    return {
      paymentId: newPayment.id,
    };
  }
}
