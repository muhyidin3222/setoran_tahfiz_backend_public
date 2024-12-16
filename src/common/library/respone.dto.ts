import { IsString, IsInt, IsArray, IsObject } from 'class-validator';

export class ResponseSucessDto {
  @IsInt()
  status_code: number;

  @IsString()
  status_message: string;

  @IsArray()
  @IsObject()
  data;

  // @IsInt()
  // @IsOptional()
  // total: number;
}
