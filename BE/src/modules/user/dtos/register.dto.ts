import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { SanitizeInput } from '../guards/sanitizeInput.guard';

export class RegisterDto extends SanitizeInput {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  reTypePassword: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
