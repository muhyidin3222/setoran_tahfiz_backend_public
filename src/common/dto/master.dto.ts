import { IsString, MaxLength } from 'class-validator';

export class GetParamMasterDto {
  @MaxLength(2)
  @IsString()
  page: string;

  @MaxLength(2)
  @IsString()
  total: string;
}

export class UpdateParamMasterDto {
  @IsString()
  id: string;
}
