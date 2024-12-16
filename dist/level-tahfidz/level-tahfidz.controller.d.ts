import { LevelTahfidzService } from './level-tahfidz.service';
import { ParamCreate, ParamGet } from './level-tahfidz.dto';
import { UserEntity } from 'src/user/user.entity';
export declare class LevelTahfidzController {
    private levelTahfidzService;
    private userRepository;
    constructor(levelTahfidzService: LevelTahfidzService, userRepository: typeof UserEntity);
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
    update(body: ParamCreate, request: any): Promise<{
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
}
