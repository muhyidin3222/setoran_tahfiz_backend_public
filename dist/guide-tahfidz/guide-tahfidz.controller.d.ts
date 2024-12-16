import { GuideTahfidzService } from './guide-tahfidz.service';
import { ParamArrayCreate, ParamCreate, ParamGet, ParamUpdate } from './guide-tahfidz.dto';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { UserEntity } from 'src/user/user.entity';
import { StudentEntity } from 'src/student/student.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
export declare class GuideTahfidzController {
    private guideTahfidzService;
    private userSetoranRepository;
    private userRepository;
    private studentRepository;
    private levelTahfidzRepository;
    constructor(guideTahfidzService: GuideTahfidzService, userSetoranRepository: typeof UserSetoranEntity, userRepository: typeof UserEntity, studentRepository: typeof StudentEntity, levelTahfidzRepository: typeof LevelTahfidzEntity);
    get(query: ParamGet, request: any): Promise<{
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
    getUserLast(query: any): Promise<{
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
    createArray(body: Array<ParamArrayCreate>, request: any): Promise<{
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
}
