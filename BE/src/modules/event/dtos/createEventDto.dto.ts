import { IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  main_img_url: string;

  @IsString()
  @IsOptional()
  sub_img_url: string;

  @IsString()
  @IsOptional()
  content: string;
}
