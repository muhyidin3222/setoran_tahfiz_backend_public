import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  admin_user_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { dataConstants } from './auth.constants';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import {
  ParamAuthDaftarDto,
  ParamAuthDto,
  ParamAuthGoogleDto,
  ParamAuthVerifyDto,
} from './auth.dto';
import { AdminUserEntity } from 'src/user/admin-user.entity';
import { ValidationTokenApp } from 'src/common/library/validation-token.service';
import { newId } from '../common/library/create-last-id.service';
import { UserService } from 'src/user/user.service';
import { cryptoDecrypt, cryptoEncrypt } from 'src/common/library/crypto';
import { sendEmail } from 'src/common/library/email';

@Injectable()
export class AuthService {
  constructor(
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    @Inject(admin_user_provider.provide)
    private adminRepository: typeof AdminUserEntity,
    private jwtService: JwtService,
    private validationTokenApp: ValidationTokenApp,
    private userService: UserService,
  ) {}

  async loginAdminService(userParamBody: ParamAuthDto): Promise<any> {
    try {
      const { email, password, type_auth } = userParamBody;
      const dataResponse: any = await this.adminRepository.findOne({
        where: {
          email,
        },
        attributes: ['id', 'email', 'password', 'id_school'],
      });
      const userData = dataResponse?.dataValues;
      const type_user = dataResponse?.id_school
        ? dataConstants.admin
        : dataConstants.master_admin;

      if (type_auth === 'signin') {
        if (!userData) throw new BadRequestException('Email Not Found');
        const payload = {
          id: userData.id,
          email: userData.email,
          type_user: type_user,
        };
        const isMatch = await bcrypt.compareSync(password, userData.password);
        if (!isMatch) throw new BadRequestException('Password Salah');
        const user_token = this.jwtService.sign(payload);
        return {
          id: userData.id,
          user_token,
          email: userData.email,
          type_admin: type_user,
        };
      } else {
        throw new BadRequestException('invalid type_auth');
      }
    } catch (error) {
      throw new InternalServerErrorException({
        description: 'server terjadi masalah, tunggu beberapa saat lagi',
      });
    }
  }

  async loginGoogleService(userParamBody: ParamAuthGoogleDto): Promise<any> {
    const { email, app_id, token_app, fcm_token, username, version, photo } =
      userParamBody;
    try {
      // const genSalt = await bcrypt.genSaltSync(10);
      // const hashPassword = await bcrypt.hashSync(password, genSalt);

      const resValidationTokenApp =
        await this.validationTokenApp.validateTokenGoogle(token_app);
      const subApp = resValidationTokenApp?.sub;

      if (subApp !== app_id)
        throw new BadRequestException('invalid token atau email');
      const defaults: any = {
        email,
        id_google: app_id,
        fcm_token: fcm_token,
        version: version,
        name: username,
        photo: photo,
        id_school: 1,
      };
      const [userCreated] = await this.userRepository.findOrCreate({
        where: {
          id_google: app_id,
        },
        defaults,
        attributes: [
          'email',
          'id_google',
          'fcm_token',
          'version',
          'name',
          'photo',
          'type_user',
          'id',
        ],
      });
      const user = userCreated?.dataValues;
      let checkStatusLogin = {};
      if (user?.type_user !== 'ustadz')
        checkStatusLogin = await this.userService.checkStatusLogin(email);
      const payload = {
        id: user.id,
        sub: user.id,
        type_user: dataConstants.user,
      };
      const user_token = this.jwtService.sign(payload);
      await this.userRepository.update(
        {
          token: user_token,
          fcm_token: fcm_token,
          version: version,
          type_user: user?.type_user ? user?.type_user : 'user',
        },
        {
          where: {
            id: user?.id,
          },
        },
      );
      return {
        ...user,
        id: user.id,
        user_token,
        email: user.email,
        type_user: user?.type_user ? user?.type_user : 'user',
        ...checkStatusLogin,
      };
    } catch (error) {
      if (error?.name === 'SequelizeAccessDeniedError')
        throw new BadRequestException(
          'maaf server terjadi masalah, tunggu beberapa saat lagi',
        );
      throw new BadRequestException(error);
    }
  }

  async daftarService(paraDaftar: ParamAuthDaftarDto): Promise<any> {
    const { id, id_school, id_student, type_user, gender, phone, id_user } =
      paraDaftar;
    const resUser = await this.userRepository.count({
      where: {
        id,
      },
      attributes: ['id'],
    });
    if (resUser) {
      await this.userRepository.update(
        {
          id_school,
          id_student,
          type_user,
          gender,
          phone,
          id_user,
        },
        {
          where: {
            id,
          },
        },
      );
    } else {
      throw new BadRequestException('Login terlebih dahulu');
    }
    return paraDaftar;
  }

  async logoutService(id: any): Promise<any> {
    await this.userRepository.update(
      {
        fcm_token: null,
        token: null,
      },
      {
        where: {
          id: id,
        },
      },
    );
    return {
      id: id,
      message: 'sukses response message',
    };
  }

  async loginService(userParamBody: ParamAuthDto): Promise<any> {
    const { email, password, type_auth, fcm_token, version } = userParamBody;
    try {
      const dataResponse: any = await this.userRepository.findOne({
        where: {
          email,
        },
        attributes: [
          'id',
          'email',
          'password',
          'fcm_token',
          'version',
          'name',
          'photo',
          'type_user',
        ],
      });
      const userData = dataResponse?.dataValues;

      if (type_auth === 'signup' && userData) {
        if (userData?.password)
          throw new BadRequestException('Akun Sudah Pernah Registrasi');
      }

      if (type_auth === 'signup') {
        const otp: string = (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1);
        const hashOtp = await cryptoEncrypt({ otp, email });
        await this.sendOtp(email, otp);
        return {
          hashOtp: hashOtp,
          message: 'success registration',
        };
      }

      if (type_auth === 'signin') {
        if (!userData) throw new BadRequestException('Email Not Found');
        const payload = {
          id: userData.id,
          sub: userData.id,
          type_user: dataConstants.user,
        };
        const isMatch = await bcrypt.compareSync(password, userData.password);
        if (!isMatch) throw new BadRequestException('Password Salah');
        const user_token = this.jwtService.sign(payload);
        await this.userRepository.update(
          {
            fcm_token: fcm_token,
            token: user_token,
            version: version,
          },
          {
            where: {
              id: userData?.id,
            },
          },
        );
        let checkStatusLogin;
        if (userData?.type_user === 'user')
          checkStatusLogin = await this.userService.checkStatusLogin(email);

        return {
          id: userData.id,
          fcm_token: userData?.fcm_token,
          version: userData?.version,
          name: userData?.name,
          photo: userData?.photo,
          type_user: userData?.type_user,
          user_token,
          email: userData.email,
          ...checkStatusLogin,
        };
      } else {
        throw new BadRequestException('invalid type_auth');
      }
    } catch (error) {
      if (error?.name === 'SequelizeAccessDeniedError')
        throw new BadRequestException(
          'maaf server terjadi masalah, tunggu beberapa saat lagi',
        );
      throw new BadRequestException(error);
    }
  }

  async sendOtp(email: string, otp: string) {
    const configEmail = {
      from: 'on_reply@supecourses.com',
      to: email,
      subject: 'OTP APP SETORAN TAHFIDZ',
      text: `
          <div>
          CODE OTP ANDA <a style="color:blue">${otp}</a>
          Jangan bagikan CODE OTP ini kepada siapapun
          <div>
          `,
    };
    await sendEmail(configEmail);
  }

  async createId() {
    const userFindOne = await this.userRepository.findOne({
      order: [['id', 'DESC']],
      attributes: ['id'],
    });
    const lastId: string = userFindOne?.dataValues?.id;
    return newId(lastId, `USER-`);
  }

  async verificationOtp(dataVerification: ParamAuthVerifyDto) {
    const { otp, hashOtp, password, email } = dataVerification;
    const resDecrypt = await cryptoDecrypt(hashOtp);
    if (resDecrypt?.email == email && otp == resDecrypt?.otp) {
      const genSalt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, genSalt);
      const [user, checkUser] = await this.userRepository.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          password: hashPassword,
          type_user: 'user',
          id_school: 1,
        },
      });
      if (!checkUser) {
        await this.userRepository.update(
          {
            password: hashPassword,
          },
          {
            where: {
              email: email,
            },
          },
        );
      }
      return {
        email,
        otp,
        message: 'silahkan login',
      };
    } else {
      throw new BadRequestException('Invalid Otp');
    }
  }
}
