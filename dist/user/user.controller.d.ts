import { UserService } from './user.service';
import { ParamCreate, ParamGet, ParamUpdate, ParamUpdateAdmin } from 'src/user/user.dto';
import { StudentEntity } from '../student/student.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
export declare class UserController {
    private userService;
    private studentRepository;
    private userSetoranRepository;
    constructor(userService: UserService, studentRepository: typeof StudentEntity, userSetoranRepository: typeof UserSetoranEntity);
    get(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    getSearch(query: ParamGet): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detail(param: any, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detailUserAdmin(param: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    self(request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    create(body: ParamCreate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    updateSelf(body: ParamUpdate, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    updateAdmin(body: ParamUpdateAdmin): Promise<{
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
    detailAdmin(request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
