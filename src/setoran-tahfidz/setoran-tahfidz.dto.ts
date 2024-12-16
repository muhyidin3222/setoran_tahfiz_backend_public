import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class dataSetoranTahfidz {
  @IsInt()
  id_student: number;

  @IsInt()
  @IsOptional()
  id_student_menyimak: number;

  @IsInt()
  incorrect: number;

  @IsInt()
  nilai: number;

  @IsInt()
  @IsOptional()
  id_guide_tahfidz: number;

  @IsString()
  @IsOptional()
  sound: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsInt()
  @IsOptional()
  id_level_tahfidz: number;
}

export class ParamGet extends GetParamMasterDto {
  @IsOptional()
  @IsString()
  id_tag: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  id_student: string;
}

export class ParamAdminGet {
  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  total: string;

  @IsOptional()
  @IsString()
  id_tag: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  id_student: string;
}

export class ParamUstadzGet extends GetParamMasterDto {
  @IsOptional()
  @IsString()
  id_user: string;

  @IsOptional()
  @IsString()
  type: string;
}
export class ParamCreate extends dataSetoranTahfidz {}
export class ParamUpdate extends dataSetoranTahfidz {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
