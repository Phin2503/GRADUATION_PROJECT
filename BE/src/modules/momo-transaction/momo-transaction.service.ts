import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoTransactionService {
  private readonly endpoint =
    'https://test-payment.momo.vn/v2/gateway/api/create'; // Endpoint sandbox
  private readonly partnerCode = ''; // Thay thế bằng mã đối tác của bạn
  private readonly accessKey = 'YOUR_ACCESS_KEY'; // Thay thế bằng khóa truy cập của bạn
  private readonly secretKey = 'YOUR_SECRET_KEY'; // Thay thế bằng khóa bí mật của bạn

  async createPayment(amount: number, orderId: string, orderInfo: string) {
    const requestBody = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId: orderId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      returnUrl: 'https://yourdomain.com/return', // URL trả về sau khi thanh toán
      notifyUrl: 'https://yourdomain.com/notify', // URL thông báo kết quả thanh toán
      extraData: '',
    };

    // Tạo chữ ký
    const signature = this.generateSignature(requestBody);

    const response = await axios.post(this.endpoint, {
      ...requestBody,
      signature,
    });

    return response.data;
  }

  private generateSignature(data: any): string {
    const rawString =
      Object.keys(data)
        .sort()
        .map((key) => `${key}=${data[key]}`)
        .join('&') + `&key=${this.secretKey}`;

    return crypto.createHash('sha256').update(rawString).digest('hex');
  }
}
