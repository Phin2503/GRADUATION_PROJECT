import { Controller, Get, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private readonly CouponService: CouponService) {}
  @Get('/check/:coupon')
  async checkCounpon(@Param('coupon') coupon: string) {
    return await this.CouponService.check(coupon);
  }
}
