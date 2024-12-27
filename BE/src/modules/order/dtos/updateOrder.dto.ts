import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class updateOrderDTO {
  @IsNotEmpty()
  userId?: string;

  @IsArray()
  seats?: string[];

  @IsArray()
  foods?: string[];

  @IsNumber()
  total_price?: number;

  @IsOptional()
  @IsNumber()
  couponId?: number;
}
