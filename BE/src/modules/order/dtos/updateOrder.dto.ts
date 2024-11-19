import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

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
}
