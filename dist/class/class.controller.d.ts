import { ClassService } from './class.service';
import { MasterParamCreate, MasterParamGet, MasterParamUpdate } from './class.dto';
import { UserEntity } from 'src/user/user.entity';
export declare class ClassController {
    private classService;
    private userRepository;
    constructor(classService: ClassService, userRepository: typeof UserEntity);
    getUserClass(query: MasterParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    createUserClass(body: MasterParamCreate, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    updateUserClass(body: MasterParamUpdate, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    deleteUserClass(id: number, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detailUserClass(param: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    get(query: MasterParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    create(body: MasterParamCreate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    update(body: MasterParamUpdate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    delete(id: number): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detail(param: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
