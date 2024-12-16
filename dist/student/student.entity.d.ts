import { Model } from 'sequelize-typescript';
import { UserClassEntity } from 'src/class/user_class.entity';
import { SchoolEntity } from 'src/school/school.entity';
export declare class StudentEntity extends Model {
    id: number;
    full_name: string;
    photo: string;
    parent: string;
    gender: string;
    email_user: string;
    no: string;
    date_of_birth: string;
    id_school: number;
    id_user: number;
    id_user_class: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    userClass: UserClassEntity;
    schoolClass: SchoolEntity;
}
