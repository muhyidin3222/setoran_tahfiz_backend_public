import { IsString, IsOptional, IsNumber } from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class dataCourses {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  id_berita: string;

  @IsOptional()
  @IsString()
  id_event: string;
}

export class ParamGet extends GetParamMasterDto {}
export class ParamCreate extends dataCourses {}
export class ParamUpdate extends dataCourses {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
