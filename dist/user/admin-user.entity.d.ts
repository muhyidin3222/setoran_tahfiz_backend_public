import { Model } from 'sequelize-typescript';
import { SchoolEntity } from 'src/school/school.entity';
export declare class AdminUserEntity extends Model {
    id: number;
    email: string;
    password: string;
    id_school: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    school: SchoolEntity;
}
