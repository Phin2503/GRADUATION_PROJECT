import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(40, { message: 'Number of seats must be at least 40' })
  @Max(150, { message: 'Number of seats must not exceed 150' })
  capacity: number;

  @IsNotEmpty()
  theater_complexId: number;
}
