import { UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataAchievement {
    name: string;
    image_achievement: string;
    link_report: string;
    link_vidio: string;
    id_student: number;
}
export declare class ParamGet {
    page: string;
    total: string;
    id_student: any;
}
export declare class ParamCreate extends dataAchievement {
}
export declare class ParamUpdate extends dataAchievement {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
