import { FoodService } from './food.service';
import { FoodController } from './food.controllers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food]), CloudinaryModule],
  controllers: [FoodController],
  providers: [FoodService, CloudinaryService],
  exports: [TypeOrmModule],
})
export class FoodModule {}
