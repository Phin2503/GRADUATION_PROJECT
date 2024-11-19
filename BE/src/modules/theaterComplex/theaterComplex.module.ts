import { Module } from '@nestjs/common';
import { TheaterComplex } from './theaterComplex.entity';
import { TheaterComplexService } from './theaterComplex.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theater } from '../theater/theater.entity';
import { TheaterComplexController } from './theaterComplex.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Theater, TheaterComplex])],
  controllers: [TheaterComplexController],
  providers: [TheaterComplexService],
  exports: [TypeOrmModule],
})
export class TheaterComplexModule {}
