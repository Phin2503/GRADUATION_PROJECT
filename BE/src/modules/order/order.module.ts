import { Module } from '@nestjs/common';
import { SeatReservationController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theater } from '../theater/theater.entity';
import { Order } from './order.entity';
import { User } from '../user/user.entity';
import { Showtime } from '../showtime/showtime.entity';
import { Seat } from '../seat/seat.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { Or } from 'typeorm';
import { Food } from '../food/food.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Theater, Order, User, Showtime, Seat, Food]),
    ScheduleModule.forRoot(),
  ],
  controllers: [SeatReservationController],
  providers: [OrderService],
  exports: [TypeOrmModule],
})
export class SeatReservationModule {}
