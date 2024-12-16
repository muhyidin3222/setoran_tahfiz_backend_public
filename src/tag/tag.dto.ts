import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';
import { UpdateParamMasterDto } from 'src/common/dto/master.dto';

class dataCourses {
  @IsString()
  name: string;
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
}
export class ParamCreate extends dataCourses {}
export class ParamUpdate extends dataCourses {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
