import { Model } from 'sequelize-typescript';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { SchoolEntity } from 'src/school/school.entity';
export declare class GuideTahfidzEntity extends Model {
    id: number;
    name: string;
    no: number;
    description: string;
    id_school: number;
    id_level_tahfidz: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    school: SchoolEntity;
    levelTahfidz: LevelTahfidzEntity;
}
