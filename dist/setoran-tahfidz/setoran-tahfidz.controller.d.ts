import { SetoranTahfidzService } from './setoran-tahfidz.service';
import { ParamAdminGet, ParamCreate, ParamGet, ParamUpdate } from './setoran-tahfidz.dto';
import { UserEntity } from 'src/user/user.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserSetoranEntity } from './user-setoran.entity';
export declare class SetoranTahfidzController {
    private setoranTahfidzService;
    private userRepository;
    private studentRepository;
    private userSetoranRepository;
    constructor(setoranTahfidzService: SetoranTahfidzService, userRepository: typeof UserEntity, studentRepository: typeof StudentEntity, userSetoranRepository: typeof UserSetoranEntity);
    get(query: ParamGet): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    getUser(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    getUstadz(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    getAdmin(query: ParamAdminGet): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    create(body: ParamCreate, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    createSertifikat(body: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    update(body: ParamUpdate): Promise<{
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
