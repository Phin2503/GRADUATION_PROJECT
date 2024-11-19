import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(40, { message: 'Number of seats must be at least 40' })
  @Max(150, { message: 'Number of seats must not exceed 150' })
  capacity: number;

  @IsNotEmpty()
  @IsString()
  address: string;
}
