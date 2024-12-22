import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Genre } from '../genre/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre]), CloudinaryModule],
  controllers: [MovieController],
  providers: [MovieService, CloudinaryService],
  exports: [TypeOrmModule],
})
export class MovieModule {}
