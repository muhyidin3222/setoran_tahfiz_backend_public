import { Model } from 'sequelize-typescript';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { StudentEntity } from 'src/student/student.entity';
export declare class AchievementEntity extends Model {
    id: number;
    name: string;
    image_achievement: string;
    uuid: string;
    link_report: string;
    link_vidio: string;
    id_school: number;
    id_student: number;
    id_level_tahfidz: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    student: StudentEntity;
    levelTahfidz: LevelTahfidzEntity;
}
