import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  MaxLength,
} from 'class-validator';
import {
  GetParamMasterDto,
  UpdateParamMasterDto,
} from 'src/common/dto/master.dto';

class masterClass {
  @IsString()
  name: string;

  @IsNumber()
  total_student: number;

  @IsString()
  school_year_start: string;

  @IsString()
  school_year_end: string;
}

export class MasterParamGet {
  @MaxLength(2)
  @IsOptional()
  @IsString()
  page: string;

  @MaxLength(2)
  @IsOptional()
  @IsString()
  total: string;

  @IsOptional()
  @IsString()
  id_tag: string;

  @IsOptional()
  @IsString()
  type: string;
}
export class MasterParamCreate extends masterClass {}
export class MasterParamUpdate extends masterClass {
  @IsNumber()
  id: number;
}
export class MasterParamDelete extends UpdateParamMasterDto {}

class userDataCourses {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  link: string;

  @IsInt()
  id_tag: number;
}

export class UserParamGet extends GetParamMasterDto {
  @IsOptional()
  @IsString()
  id_tag: string;

  @IsOptional()
  @IsString()
  type: string;
}
export class UserParamCreate extends userDataCourses {}
export class UserParamUpdate extends userDataCourses {
  @IsNumber()
  id: number;
}
export class UserParamDelete extends UpdateParamMasterDto {}
