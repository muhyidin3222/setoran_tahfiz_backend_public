import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataStudent {
    full_name: string;
    photo: string;
    gender: string;
    no: string;
    id_master_class: number;
    email_user: string;
    date_of_birth: string;
}
export declare class ParamGet extends GetParamMasterDto {
    id_user_class: string;
    id_master_class: string;
    search: string;
}
export declare class ParamCreate extends dataStudent {
}
export declare class ParamUpdate extends dataStudent {
    full_name: string;
    photo: string;
    gender: string;
    no: string;
    id_master_class: number;
    email_user: string;
    date_of_birth: string;
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export declare class ParamArrayCreate {
    full_name: string;
    no: string;
    master_class: string;
    email_user: string;
    gender: string;
}
export {};
