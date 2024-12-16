import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataCourses {
    title: string;
    image: string;
    description: string;
    link: string;
    id_tag: number;
}
export declare class ParamGet extends GetParamMasterDto {
    id_tag: string;
    type: string;
}
export declare class ParamCreate extends dataCourses {
}
export declare class ParamUpdate extends dataCourses {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
