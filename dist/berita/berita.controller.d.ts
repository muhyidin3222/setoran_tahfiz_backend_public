import { BeritaService } from './berita.service';
import { ParamCreate, ParamGet, ParamUpdate } from './berita.dto';
import { UserEntity } from 'src/user/user.entity';
export declare class BeritaController {
    private beritaService;
    private userRepository;
    constructor(beritaService: BeritaService, userRepository: typeof UserEntity);
    get(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    getAdmin(query: ParamGet, request: any): Promise<{
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
    update(body: ParamUpdate, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    delete(id: number, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detailAdmin(param: any): Promise<{
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
