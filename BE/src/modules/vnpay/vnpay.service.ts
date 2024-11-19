import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as queryString from 'qs';

@Injectable()
export class VnpayService {
  private readonly secretKey = '0D682GJ4P4ZH196M8S5BBURI238295EN';
  private readonly merchantId = '2KE0DG8Z';

  createPayment(amount: number, orderId: string, orderInfo: string) {
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    let vnpParams: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.merchantId,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 190000,
      vnp_Amount: amount * 100,
      vnp_IpAddr: this.getIpAddr(),
      vnp_ReturnUrl: 'http://localhost:5173/return',
      vnp_CreateDate: this.getCurrentDate(),
      vnp_ExpireDate: this.getExpireDate(2),
    };

    vnpParams = this.sortObject(vnpParams);
    let signData = queryString.stringify(vnpParams);
    let hmac = crypto.createHmac('sha512', this.secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnpParams.vnp_SecureHash = signed;
    vnpUrl += '?' + queryString.stringify(vnpParams);

    return vnpUrl;
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.formatDate(date);
  }

  private getExpireDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.formatDate(date);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`; // Định dạng yyyyMMddHHmmss
  }

  private getIpAddr(): string {
    return '127.0.0.1';
  }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
