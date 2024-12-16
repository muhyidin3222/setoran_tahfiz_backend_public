import { StudentEntity } from 'src/student/student.entity';
import { AdminUserEntity } from './admin-user.entity';
import { UserEntity } from './user.entity';
export declare class UserService {
    private userRepository;
    private adminRepository;
    private studentRepository;
    constructor(userRepository: typeof UserEntity, adminRepository: typeof AdminUserEntity, studentRepository: typeof StudentEntity);
    detailService(param: any): Promise<UserEntity>;
    getService(query: any): Promise<{
        rows: UserEntity[];
        count: number;
    }>;
    getFindAll(query: any): Promise<UserEntity[]>;
    deleteService(id: number): Promise<UserEntity | any>;
    updateService(body: UserEntity | any): Promise<UserEntity>;
    createService(body: UserEntity | any): Promise<UserEntity>;
    detailAdminService(param: any): Promise<AdminUserEntity>;
    checkStatusLogin(email: string): Promise<any>;
}
