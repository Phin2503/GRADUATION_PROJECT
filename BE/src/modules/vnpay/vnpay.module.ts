import { Module } from '@nestjs/common';
import { VnpayController } from './vnpay.controller';
import { VnpayService } from './vnpay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { PaymentService } from '../payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment])],
  controllers: [VnpayController],
  providers: [VnpayService, PaymentService],
})
export class VnpayModule {}
