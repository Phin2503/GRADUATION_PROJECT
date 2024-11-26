import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  genre: string;

  @IsString()
  background_image_url: any;
}
