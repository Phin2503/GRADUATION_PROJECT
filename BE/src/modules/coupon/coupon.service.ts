import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Coupon } from './coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private readonly CouponRepo: Repository<Coupon>,
  ) {}

  async check(coupon: string) {
    const couponExisting = await this.CouponRepo.findOneBy({
      code: coupon,
    });

    if (!couponExisting) {
      throw new NotFoundException('Invalid Coupon !');
    }

    if (couponExisting.expiryDate < new Date()) {
      throw new BadRequestException('Coupon has expired !');
    }

    return couponExisting;
  }
}
