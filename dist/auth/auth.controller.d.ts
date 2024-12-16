import { AuthService } from './auth.service';
import { ParamAuthDaftarDto, ParamAuthDto, ParamAuthGoogleDto, ParamAuthVerifyDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    gogoleLogin(userParamBody: ParamAuthGoogleDto): Promise<{
        status_code: string;
        status_message: string;
        data: any;
    }>;
    loginAdmin(userParamBody: ParamAuthDto): Promise<{
        status_code: string;
        status_message: string;
        data: any;
    }>;
    verification(userParamBody: ParamAuthVerifyDto): Promise<{
        status_code: string;
        status_message: string;
        data: {
            email: string;
            otp: string;
            message: string;
        };
    }>;
    loginUUser(userParamBody: ParamAuthDto): Promise<{
        status_code: string;
        status_message: string;
        data: any;
    }>;
    submitDaftar(body: ParamAuthDaftarDto, request: any): Promise<{
        status_code: string;
        status_message: string;
        data: any;
    }>;
    logout(request: any): Promise<{
        status_code: string;
        status_message: string;
        data: any;
    }>;
}
