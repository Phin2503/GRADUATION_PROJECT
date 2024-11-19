import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateFoodDto {
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
