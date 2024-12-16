import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import {
  ParamAuthDaftarDto,
  ParamAuthDto,
  ParamAuthGoogleDto,
  ParamAuthVerifyDto,
} from './auth.dto';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { dataConstants } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle(5, 10)
  @Post('/google-login')
  async gogoleLogin(@Body() userParamBody: ParamAuthGoogleDto) {
    // console.log(userParamBody, ' ===> log request body');
    const responseData = await this.authService.loginGoogleService(
      userParamBody,
    );
    return {
      status_code: '200',
      status_message: 'Login success, your token will expire in 30 days.',
      data: responseData,
    };
  }

  @Throttle(5, 10)
  @Post('/admin/login')
  async loginAdmin(@Body() userParamBody: ParamAuthDto) {
    const responseData = await this.authService.loginAdminService(
      userParamBody,
    );
    return {
      status_code: '200',
      status_message: 'Login success, your token will expire in 30 days.',
      data: responseData,
    };
  }

  @Throttle(5, 10)
  @Post('/verify')
  async verification(@Body() userParamBody: ParamAuthVerifyDto) {
    const responseData = await this.authService.verificationOtp(userParamBody);
    return {
      status_code: '200',
      status_message: 'Login success, your token will expire in 30 days.',
      data: responseData,
    };
  }

  @Throttle(5, 10)
  @Post('/user/login')
  async loginUUser(@Body() userParamBody: ParamAuthDto) {
    const responseData = await this.authService.loginService(userParamBody);
    return {
      status_code: '200',
      status_message: 'Login success, your token will expire in 30 days.',
      data: responseData,
    };
  }

  @Throttle(5, 10)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  @Post('/daftar')
  async submitDaftar(@Body() body: ParamAuthDaftarDto, @Req() request) {
    const { user } = request;
    const responseData = await this.authService.daftarService({
      id_user: user?.id,
      ...body,
    });
    return {
      status_code: '200',
      status_message: 'Logout succes.',
      data: responseData,
    };
  }

  @Throttle(5, 10)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  @Post('/logout')
  async logout(@Req() request) {
    const { user } = request;
    const responseData = await this.authService.logoutService(user?.id);
    return {
      status_code: '200',
      status_message: 'Logout succes.',
      data: responseData,
    };
  }
}
