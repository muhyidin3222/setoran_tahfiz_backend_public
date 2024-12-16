import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataSetoranTahfidz {
    id_student: number;
    id_student_menyimak: number;
    incorrect: number;
    nilai: number;
    id_guide_tahfidz: number;
    sound: string;
    message: string;
    image: string;
    id_level_tahfidz: number;
}
export declare class ParamGet extends GetParamMasterDto {
    id_tag: string;
    type: string;
    id_student: string;
}
export declare class ParamAdminGet {
    page: string;
    total: string;
    id_tag: string;
    type: string;
    id_student: string;
}
export declare class ParamUstadzGet extends GetParamMasterDto {
    id_user: string;
    type: string;
}
export declare class ParamCreate extends dataSetoranTahfidz {
}
export declare class ParamUpdate extends dataSetoranTahfidz {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
