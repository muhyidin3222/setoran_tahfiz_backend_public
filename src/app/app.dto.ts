import { IsEmail, IsString, MaxLength } from 'class-validator';

export class ParamEmailDto {
  @MaxLength(300)
  @IsString()
  username: string;

  @MaxLength(100)
  @IsEmail()
  email: string;

  @MaxLength(1000)
  @IsString()
  note: string;
}

export class ParamCodeReferalDto {
  @MaxLength(6)
  @IsString()
  referal_code: string;
}

export class ParamTopicDto {
  @MaxLength(1000)
  @IsString()
  token: string;
}
