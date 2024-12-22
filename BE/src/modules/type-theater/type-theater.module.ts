import { Module } from '@nestjs/common';
import { TypeTheaterController } from './type-theater.controller';
import { TypeTheaterService } from './type-theater.service';

@Module({
  controllers: [TypeTheaterController],
  providers: [TypeTheaterService]
})
export class TypeTheaterModule {}
