import { MasterParamCreate, MasterParamUpdate } from './class.dto';
import { MasterClassEntity } from './master_class.entity';
import { UserClassEntity } from './user_class.entity';
export declare class ClassService {
    private masterSchoolRepository;
    private userClassRepository;
    constructor(masterSchoolRepository: typeof MasterClassEntity, userClassRepository: typeof UserClassEntity);
    detailMasterClassService(param: any): Promise<MasterClassEntity>;
    getMasterClassService(query: any): Promise<{
        rows: MasterClassEntity[];
        count: number;
    }>;
    deleteMasterClassService(where: any): Promise<MasterClassEntity | any>;
    updateMasterClassService(body: MasterParamUpdate | any): Promise<MasterClassEntity>;
    createMasterClassService(body: MasterParamCreate | any): Promise<MasterClassEntity>;
    detailUserClassService(param: any): Promise<UserClassEntity>;
    getUserClassService(query: any): Promise<{
        rows: UserClassEntity[];
        count: number;
    }>;
    deleteUserClassService(id: number): Promise<UserClassEntity | any>;
    updateUserClassService(body: MasterParamUpdate | any): Promise<UserClassEntity>;
    createUserClassService(body: MasterParamCreate | any): Promise<UserClassEntity>;
}
