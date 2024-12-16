import { Model } from 'sequelize-typescript';
import { UserEntity } from 'src/user/user.entity';
export declare class MasterClassEntity extends Model {
    id: number;
    name: string;
    total_student: number;
    school_year_start: string;
    school_year_end: string;
    id_school: number;
    id_wali_kelas: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    waliKelas: UserEntity;
}
