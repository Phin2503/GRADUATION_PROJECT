import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('return-payment')
  async getInfoPayment(@Query() status: any, @Res() res: Response) {
    const { vnp_TxnRef, vnp_ResponseCode } = status;

    const redirectUrl = await this.paymentService.updateOrder(
      vnp_TxnRef,
      vnp_ResponseCode,
    );
    if (redirectUrl) {
      res.redirect(redirectUrl);
    }
  }
}
