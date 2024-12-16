import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class dataStudent {
  @IsString()
  full_name: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  gender: string;

  @IsString()
  no: string;

  @IsInt()
  @IsOptional()
  id_master_class: number;

  @IsString()
  @IsOptional()
  email_user: string;

  @IsString()
  @IsOptional()
  date_of_birth: string;
}

export class ParamGet extends GetParamMasterDto {
  @IsOptional()
  @IsString()
  id_user_class: string;

  @IsOptional()
  @IsString()
  id_master_class: string;

  @IsOptional()
  @IsString()
  search: string;
}
export class ParamCreate extends dataStudent {}
export class ParamUpdate extends dataStudent {
  @IsString()
  @IsOptional()
  full_name: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  no: string;

  @IsInt()
  @IsOptional()
  id_master_class: number;

  @IsString()
  @IsOptional()
  email_user: string;

  @IsString()
  @IsOptional()
  date_of_birth: string;

  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
export class ParamArrayCreate {
  @IsString()
  full_name: string;

  @IsString()
  no: string;

  @IsString()
  @IsOptional()
  master_class: string;

  @IsOptional()
  @IsString()
  email_user: string;

  @IsOptional()
  @IsString()
  gender: string;
}
