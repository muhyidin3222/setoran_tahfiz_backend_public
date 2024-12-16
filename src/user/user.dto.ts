import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class dataUser {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  date_of_birth: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  version: string;
}

export class ParamGet extends GetParamMasterDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  type_user: string;
}
export class ParamCreate extends dataUser {}
export class ParamUpdate extends dataUser {
  @IsNumber()
  id: number;
}
export class ParamUpdateAdmin extends dataUser {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  type_user: string;

  @IsInt()
  @IsOptional()
  id_school: string;
}
export class ParamUpdateReview {
  @IsString()
  id_school: string;
}
export class ParamDelete extends UpdateParamMasterDto {}
