import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';
import { Payment } from './payment.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule, // Đảm bảo import EmailModule
    TypeOrmModule.forFeature([Order, Payment]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
