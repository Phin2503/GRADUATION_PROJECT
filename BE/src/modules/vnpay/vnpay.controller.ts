import { Controller, Post, Body, Get } from '@nestjs/common';
import { VnpayService } from './vnpay.service';

@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post('payment')
  createPayment(
    @Body() paymentDto: { amount: number; orderId: string; orderInfo: string },
  ) {
    const paymentUrl = this.vnpayService.createPayment(
      paymentDto.amount,
      paymentDto.orderId,
      paymentDto.orderInfo,
    );
    return { paymentUrl };
  }

  @Get('return')
  handleReturn(@Body() req) {
    // Xử lý thông tin trả về từ VNPay
    console.log(req);
    // Xử lý logic tại đây
    return 'Return from VNPay';
  }
}
