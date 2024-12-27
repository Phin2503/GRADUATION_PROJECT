import { Module } from '@nestjs/common';
import { GroqaiService } from './groqai.service';
import { GroqaiController } from './groqai.controller';
import Groq from 'groq-sdk';
import { ShowtimeService } from '../showtime/showtime.service';
import { TheaterService } from '../theater/theater.service';
import { TheaterModule } from '../theater/theater.module';
import { ShowtimeModule } from '../showtime/showtime.module';

@Module({
  imports: [ShowtimeModule, TheaterModule],
  providers: [GroqaiService, Groq, ShowtimeService, TheaterService],
  controllers: [GroqaiController],
})
export class GroqaiModule {}
