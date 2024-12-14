import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { PaymentService } from '../payment/payment.service';

@Controller('vnpay')
export class VnpayController {
  constructor(
    private readonly vnpayService: VnpayService,
    private readonly PaymentService: PaymentService,
  ) {}

  @Post('payment')
  async createPayment(
    @Req() req: Request,
    @Body() paymentDto: { amount: number; orderId: string },
  ) {
    const paymentUrl = await this.vnpayService.createPayment(
      req,
      paymentDto.amount,
      paymentDto.orderId,
    );
    return { paymentUrl };
  }
}
