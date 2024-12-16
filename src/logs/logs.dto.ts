import { IsString } from 'class-validator';

class dataLevelTahfidz {
  @IsString()
  key: string;

  @IsString()
  data_log: string;
}

export class ParamCreate extends dataLevelTahfidz {}
