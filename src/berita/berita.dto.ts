import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class dataCourses {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsOptional()
  @IsInt()
  id_tag: number;
}

export class ParamGet extends GetParamMasterDto {
  @IsOptional()
  @IsString()
  id_tag: string;

  @IsOptional()
  @IsString()
  type: string;
}
export class ParamCreate extends dataCourses {}
export class ParamUpdate extends dataCourses {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
