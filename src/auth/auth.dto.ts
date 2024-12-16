import { Optional } from '@nestjs/common';
import { IsString, MaxLength, IsOptional, IsInt } from 'class-validator';

export class ParamAuthDto {
  @IsString()
  @MaxLength(250)
  email: string;

  @IsString()
  @MaxLength(200)
  password: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  type_auth: string;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  fcm_token: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  version: string;
}

export class ParamAuthGoogleDto {
  @IsString()
  @MaxLength(250)
  email: string;

  @IsString()
  @MaxLength(5000)
  token_app: string;

  @IsString()
  @MaxLength(50)
  type_login: string;

  @IsString()
  @MaxLength(1000)
  app_id: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  username: string;

  @IsString()
  @MaxLength(5000)
  @IsOptional()
  photo: string;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  fcm_token: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  version: string;
}

export class ParamAuthVerifyDto {
  @IsString()
  @MaxLength(250)
  email: string;

  @IsString()
  @MaxLength(200)
  password: string;

  @IsString()
  @MaxLength(250)
  hashOtp: string;

  @IsString()
  @MaxLength(4)
  otp: string;
}

export class ParamAuthDaftarDto {
  @IsInt()
  @MaxLength(50)
  id: string;

  @IsString()
  @MaxLength(50)
  id_school: string;

  @IsString()
  @MaxLength(50)
  id_student: string;

  @IsString()
  @MaxLength(50)
  type_user: string;

  @IsString()
  @MaxLength(10)
  gender: string;

  @IsString()
  @MaxLength(50)
  phone: string;

  @IsString()
  @MaxLength(50)
  id_user: string;
}

export class ParamAuthSellerDto extends ParamAuthDto {
  @IsString()
  @MaxLength(200)
  username: string;

  @IsString()
  @MaxLength(150)
  phone: string;
}

export class ParamAuthSignupDto {
  @IsString()
  @MaxLength(250)
  email: string;

  @IsString()
  @MaxLength(200)
  password: string;

  @IsString()
  @MaxLength(200)
  username: string;
}

export class ParamSendWaDto {
  @IsString()
  @MaxLength(200)
  mobile_number: string;

  @IsString()
  @Optional()
  @MaxLength(200)
  typeSend: string;
}

export class ParamValidationWaDto {
  @IsString()
  @MaxLength(200)
  mobile_number: string;

  @IsString()
  @MaxLength(6)
  otp: number;
}
