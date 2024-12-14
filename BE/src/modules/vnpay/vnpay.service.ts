import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as queryString from 'qs';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';

@Injectable()
export class VnpayService {
  private readonly secretKey = '0D682GJ4P4ZH196M8S5BBURI238295EN';
  private readonly merchantId = '2KE0DG8Z';
  private readonly vnpUrl =
    'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private readonly returnUrl =
    'http://localhost:3000/api/v1/payment/return-payment';

  createPayment(req: any, amount: number, orderId: string): string {
    const createDate = moment().format('YYYYMMDDHHmmss');

    let vnpParams: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.merchantId,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD: ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: this.returnUrl,
      vnp_IpAddr: this.getIpAddr(req),
      vnp_CreateDate: createDate,
    };

    vnpParams = this.sortObject(vnpParams);

    const signData = queryString.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnpParams.vnp_SecureHash = signed;

    return `${this.vnpUrl}?${queryString.stringify(vnpParams, { encode: false })}`;
  }

  private getCurrentDate(): string {
    return moment().format('YYYYMMDDHHmmss');
  }

  private getIpAddr(req): string {
    return (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      '127.0.0.1'
    );
  }

  private sortObject(obj): any {
    const sorted = {};
    const str = Object.keys(obj).sort();
    for (const key of str) {
      sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
