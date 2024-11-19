import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { Theater } from './theater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterComplex } from '../theaterComplex/theaterComplex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theater, TheaterComplex])],
  controllers: [TheaterController],
  providers: [TheaterService],
  exports: [TypeOrmModule],
})
export class TheaterModule {}
