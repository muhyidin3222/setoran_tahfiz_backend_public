import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';
import { UpdateParamMasterDto } from 'src/common/dto/master.dto';

class dataLevelTahfidz {
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

  @IsOptional()
  @MaxLength(30)
  @IsString()
  search: string;

  @IsOptional()
  @MaxLength(30)
  @IsString()
  id_student: string;
}
export class ParamCreate extends dataLevelTahfidz {}
export class ParamUpdate extends dataLevelTahfidz {
  @IsNumber()
  id: number;
}
export class ParamDelete extends UpdateParamMasterDto {}
