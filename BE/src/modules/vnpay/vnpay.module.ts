import { Module } from '@nestjs/common';
import { VnpayController } from './vnpay.controller';
import { VnpayService } from './vnpay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { PaymentService } from '../payment/payment.service';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from '../email/email.module';
import { EmailConsumers } from '../consumer/email.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment])],
  controllers: [VnpayController],
  providers: [VnpayService],
})
export class VnpayModule {}
