import { UpdateParamMasterDto } from 'src/common/dto/master.dto';
declare class dataLevelTahfidz {
    name: string;
}
export declare class ParamGet {
    page: string;
    total: string;
    search: string;
    id_student: string;
}
export declare class ParamCreate extends dataLevelTahfidz {
}
export declare class ParamUpdate extends dataLevelTahfidz {
    id: number;
}
export declare class ParamDelete extends UpdateParamMasterDto {
}
export {};
