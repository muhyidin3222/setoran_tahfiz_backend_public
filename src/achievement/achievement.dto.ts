import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsInt,
} from 'class-validator';
import { UpdateParamMasterDto } from 'src/common/dto/master.dto';

class dataAchievement {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image_achievement: string;

  @IsString()
  @IsOptional()
  link_report: string;

  @IsString()
  @IsOptional()
  link_vidio: string;

  @IsInt()
  id_student: number;
}

export class ParamGet {
  @IsOptional()
  @MaxLength(2)
  @IsString()
  page: string;

  @IsOptional()
  @MaxLength(2)
  @IsString()
  total: string;

  @IsOptional()
  @IsString()
  id_student;
}
export class ParamCreate extends dataAchievement {}
export class ParamUpdate extends dataAchievement {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
