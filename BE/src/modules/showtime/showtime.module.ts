import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { Showtime } from './showtime.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movie/movie.entity';
import { Theater } from '../theater/theater.entity';
import { Order } from '../order/order.entity';
import { Seat } from '../seat/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime, Movie, Theater, Order])],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
  exports: [TypeOrmModule],
})
export class ShowtimeModule {}
