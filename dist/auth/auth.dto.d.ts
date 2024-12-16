export declare class ParamAuthDto {
    email: string;
    password: string;
    type_auth: string;
    fcm_token: string;
    version: string;
}
export declare class ParamAuthGoogleDto {
    email: string;
    token_app: string;
    type_login: string;
    app_id: string;
    username: string;
    photo: string;
    fcm_token: string;
    version: string;
}
export declare class ParamAuthVerifyDto {
    email: string;
    password: string;
    hashOtp: string;
    otp: string;
}
export declare class ParamAuthDaftarDto {
    id: string;
    id_school: string;
    id_student: string;
    type_user: string;
    gender: string;
    phone: string;
    id_user: string;
}
export declare class ParamAuthSellerDto extends ParamAuthDto {
    username: string;
    phone: string;
}
export declare class ParamAuthSignupDto {
    email: string;
    password: string;
    username: string;
}
export declare class ParamSendWaDto {
    mobile_number: string;
    typeSend: string;
}
export declare class ParamValidationWaDto {
    mobile_number: string;
    otp: number;
}
