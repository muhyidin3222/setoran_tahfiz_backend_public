import { UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataCourses {
    name: string;
}
export declare class ParamGet {
    page: string;
    total: string;
}
export declare class ParamCreate extends dataCourses {
}
export declare class ParamUpdate extends dataCourses {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
