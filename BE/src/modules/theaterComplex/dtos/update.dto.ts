import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTheaterComplexDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
