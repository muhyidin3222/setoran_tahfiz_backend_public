import { GetParamMasterDto, UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataCourses {
    name: string;
    description: string;
    type: string;
    id_berita: string;
    id_event: string;
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
