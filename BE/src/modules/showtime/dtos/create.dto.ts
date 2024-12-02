import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateShowtimeDto {
  @IsNotEmpty()
  showtime_start: Date;

  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @IsNotEmpty()
  @IsInt()
  theaterId: number;

  @IsNotEmpty()
  @IsInt()
  theater_complexId: number;
}
