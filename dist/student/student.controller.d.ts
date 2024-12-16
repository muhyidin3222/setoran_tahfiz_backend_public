import { StudentService } from './student.service';
import { ParamArrayCreate, ParamCreate, ParamGet, ParamUpdate } from './student.dto';
import { UserEntity } from 'src/user/user.entity';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { StudentEntity } from './student.entity';
import { AchievementEntity } from 'src/achievement/achievement.entity';
export declare class StudentController {
    private studentService;
    private userRepository;
    private userSetoranRepository;
    private masterClassRepository;
    private studentRepository;
    private achievementRepository;
    constructor(studentService: StudentService, userRepository: typeof UserEntity, userSetoranRepository: typeof UserSetoranEntity, masterClassRepository: typeof MasterClassEntity, studentRepository: typeof StudentEntity, achievementRepository: typeof AchievementEntity);
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
    createArray(body: Array<ParamArrayCreate>, request: any): Promise<{
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
    getStudentSpreadsheet(): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    updateUser(body: ParamUpdate, request: any): Promise<{
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
    detail(param: any, request: any): Promise<{
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
}
