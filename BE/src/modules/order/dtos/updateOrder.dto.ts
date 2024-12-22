import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class updateOrderDTO {
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsNotEmpty()
  seats: string[];

  @IsArray()
  @IsNotEmpty()
  foods: string[];

  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @IsOptional()
  @IsNumber()
  couponId: number;
}
