import { UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataGuideTahfidz {
    name: string;
    id_level_tahfidz: number;
    no: number;
    description: string;
}
export declare class ParamGet {
    page: string;
    total: string;
    type: string;
    search: string;
    type_search: string;
    level_tahfidz: string;
}
export declare class ParamCreate extends dataGuideTahfidz {
}
export declare class ParamArrayCreate {
    name: string;
    description: string;
    level_tahfidz: string;
    no: number;
}
export declare class ParamUpdate extends dataGuideTahfidz {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
