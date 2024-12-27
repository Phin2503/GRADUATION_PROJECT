import { IsNotEmpty, IsString } from 'class-validator';

export class SendMes {
  @IsString()
  @IsNotEmpty()
  mess: string;
}
