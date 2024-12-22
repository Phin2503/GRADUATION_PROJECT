import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDTO {
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
