import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsInt,
} from 'class-validator';
import { UpdateParamMasterDto } from 'src/common/dto/master.dto';

class dataGuideTahfidz {
  @IsString()
  name: string;

  @IsInt()
  id_level_tahfidz: number;

  @IsInt()
  @IsOptional()
  no: number;

  @IsString()
  @IsOptional()
  description: string;
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

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  type_search: string;

  @IsString()
  @IsOptional()
  level_tahfidz: string;
}
export class ParamCreate extends dataGuideTahfidz {}
export class ParamArrayCreate {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  level_tahfidz: string;

  @IsInt()
  @IsOptional()
  no: number;
}
export class ParamUpdate extends dataGuideTahfidz {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
