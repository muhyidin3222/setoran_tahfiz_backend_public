import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataCourses {
    banner1: string;
    banner2: string;
    banner3: string;
}
export declare class ParamGet extends GetParamMasterDto {
}
export declare class ParamCreate extends dataCourses {
}
export declare class ParamUpdate extends dataCourses {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
