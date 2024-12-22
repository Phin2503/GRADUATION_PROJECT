import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  release_date: string;

  @IsString()
  background_image_url: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @IsNumber()
  genreId: number;
}
