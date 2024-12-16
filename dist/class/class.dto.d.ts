import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class masterClass {
    name: string;
    total_student: number;
    school_year_start: string;
    school_year_end: string;
}
export declare class MasterParamGet {
    page: string;
    total: string;
    id_tag: string;
    type: string;
}
export declare class MasterParamCreate extends masterClass {
}
export declare class MasterParamUpdate extends masterClass {
    id: number;
}
export declare class MasterParamDelete extends UpdateParamMasterDto {
}
declare class userDataCourses {
    title: string;
    image: string;
    description: string;
    link: string;
    id_tag: number;
}
export declare class UserParamGet extends GetParamMasterDto {
    id_tag: string;
    type: string;
}
export declare class UserParamCreate extends userDataCourses {
}
export declare class UserParamUpdate extends userDataCourses {
    id: number;
}
export declare class UserParamDelete extends UpdateParamMasterDto {
}
export {};
