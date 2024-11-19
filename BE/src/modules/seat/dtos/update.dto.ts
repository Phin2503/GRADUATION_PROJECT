import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { SEAT_TYPE } from 'src/modules/enumTypes/seat_type/seat_type.enum';

export class UpdateSeatDto {
  @IsString()
  @IsNotEmpty({ message: 'Seat number cannot be empty.' })
  @Length(2, 10, {
    message: 'Seat number must be between 2 and 10 characters.',
  })
  seat_number: string;

  @IsNotEmpty({ message: 'Seat type is required.' })
  @IsEnum(SEAT_TYPE, { message: 'Invalid seat type.' })
  seat_type: SEAT_TYPE;

  @IsNotEmpty({ message: 'Theater ID is required.' })
  @IsNumber({}, { message: 'Theater ID must be a number.' })
  theaterId: number;
}
