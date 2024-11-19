import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsString()
  img_url: string;

  @IsOptional()
  @IsString()
  description: string;
}
