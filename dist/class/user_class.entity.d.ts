import { Model } from 'sequelize-typescript';
import { StudentEntity } from 'src/student/student.entity';
import { MasterClassEntity } from './master_class.entity';
export declare class UserClassEntity extends Model {
    id: number;
    id_student: number;
    id_master_class: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    masterClass: MasterClassEntity;
    student: StudentEntity;
}
