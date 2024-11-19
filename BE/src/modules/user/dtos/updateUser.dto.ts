import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, {
    message: 'Phone number is not valid',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
