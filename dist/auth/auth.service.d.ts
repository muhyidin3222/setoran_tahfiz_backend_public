import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { ParamAuthDaftarDto, ParamAuthDto, ParamAuthGoogleDto, ParamAuthVerifyDto } from './auth.dto';
import { AdminUserEntity } from 'src/user/admin-user.entity';
import { ValidationTokenApp } from 'src/common/library/validation-token.service';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userRepository;
    private adminRepository;
    private jwtService;
    private validationTokenApp;
    private userService;
    constructor(userRepository: typeof UserEntity, adminRepository: typeof AdminUserEntity, jwtService: JwtService, validationTokenApp: ValidationTokenApp, userService: UserService);
    loginAdminService(userParamBody: ParamAuthDto): Promise<any>;
    loginGoogleService(userParamBody: ParamAuthGoogleDto): Promise<any>;
    daftarService(paraDaftar: ParamAuthDaftarDto): Promise<any>;
    logoutService(id: any): Promise<any>;
    loginService(userParamBody: ParamAuthDto): Promise<any>;
    sendOtp(email: string, otp: string): Promise<void>;
    createId(): Promise<string>;
    verificationOtp(dataVerification: ParamAuthVerifyDto): Promise<{
        email: string;
        otp: string;
        message: string;
    }>;
}
