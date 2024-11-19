import { Body, Controller, Post } from '@nestjs/common';
import { MomoTransactionService } from './momo-transaction.service';

@Controller('momo-transaction')
export class MomoTransactionController {
  constructor(private readonly momoService: MomoTransactionService) {}

  @Post('payment')
  async createPayment(
    @Body() paymentDto: { amount: number; orderId: string; orderInfo: string },
  ) {
    return this.momoService.createPayment(
      paymentDto.amount,
      paymentDto.orderId,
      paymentDto.orderInfo,
    );
  }
}
