import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class updateShowtimeDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  showtime_start: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  showtime_end: Date;

  @IsOptional()
  movie_id: number;

  @IsOptional()
  theater_id: number;
}
