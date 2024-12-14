import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrderService } from '../order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';
import { Payment } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
