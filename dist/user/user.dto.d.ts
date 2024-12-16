import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataUser {
    name: string;
    phone: string;
    photo: string;
    gender: string;
    location: string;
    date_of_birth: string;
    about: string;
    version: string;
}
export declare class ParamGet extends GetParamMasterDto {
    search: string;
    type_user: string;
}
export declare class ParamCreate extends dataUser {
}
export declare class ParamUpdate extends dataUser {
    id: number;
}
export declare class ParamUpdateAdmin extends dataUser {
    id: number;
    type_user: string;
    id_school: string;
}
export declare class ParamUpdateReview {
    id_school: string;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
