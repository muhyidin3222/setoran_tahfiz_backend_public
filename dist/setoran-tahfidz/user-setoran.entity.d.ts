import { Model } from 'sequelize-typescript';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class UserSetoranEntity extends Model {
    id: number;
    id_student: number;
    id_user_menyimak: number;
    image: number;
    id_user: number;
    id_student_menyimak: number;
    incorrect: number;
    nilai: number;
    id_guide_tahfidz: number;
    id_level_tahfidz: number;
    sound: string;
    message: string;
    note: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    studentMeyimak: StudentEntity;
    student: StudentEntity;
    userMeyimak: UserEntity;
    user: UserEntity;
    guideTahfidz: GuideTahfidzEntity;
    levelTahfidz: LevelTahfidzEntity;
}
