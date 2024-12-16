import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserClassEntity } from 'src/class/user_class.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UserEntity } from 'src/user/user.entity';
import { ParamCreate, ParamUpdate } from './student.dto';
import { StudentEntity } from './student.entity';
export declare class StudentService {
    private studentRepository;
    private userClassRepository;
    private userRepository;
    private readonly notificationService;
    private masterClassRepository;
    constructor(studentRepository: typeof StudentEntity, userClassRepository: typeof UserClassEntity, userRepository: typeof UserEntity, notificationService: NotificationService, masterClassRepository: typeof MasterClassEntity);
    detailService(param: any): Promise<StudentEntity>;
    getService(query: any): Promise<{
        rows: StudentEntity[];
        count: number;
    }>;
    getServiceAdmin(query: any): Promise<{
        rows: StudentEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<StudentEntity | any>;
    updateService(body: ParamUpdate | any): Promise<StudentEntity>;
    updateEmailUser(body: any): Promise<StudentEntity>;
    updateServiceAdmin(body: ParamUpdate | any): Promise<StudentEntity>;
    createService(body: ParamCreate | any): Promise<StudentEntity>;
    createServiceArray(body: StudentEntity | any): Promise<StudentEntity[]>;
    getSpreadsheet(): Promise<any>;
}
