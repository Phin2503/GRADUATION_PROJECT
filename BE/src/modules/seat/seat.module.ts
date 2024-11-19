import { Module } from '@nestjs/common';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { Theater } from '../theater/theater.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Theater])],
  controllers: [SeatController],
  providers: [SeatService],
  exports: [TypeOrmModule],
})
export class SeatModule {}
