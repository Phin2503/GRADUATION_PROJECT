import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTheaterComplexDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  province: string;
}
