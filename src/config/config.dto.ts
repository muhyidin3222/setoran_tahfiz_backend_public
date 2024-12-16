import { IsString, IsOptional, IsNumber } from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class dataCourses {
  @IsString()
  banner1: string;

  @IsString()
  @IsOptional()
  banner2: string;

  @IsString()
  @IsOptional()
  banner3: string;
}

export class ParamGet extends GetParamMasterDto {}
export class ParamCreate extends dataCourses {}
export class ParamUpdate extends dataCourses {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
