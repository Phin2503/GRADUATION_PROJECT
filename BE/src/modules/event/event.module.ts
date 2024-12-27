import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), CloudinaryModule],
  controllers: [EventController],
  providers: [EventService, CloudinaryService],
  exports: [TypeOrmModule],
})
export class EventModule {}
