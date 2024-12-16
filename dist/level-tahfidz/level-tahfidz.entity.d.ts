import { Model } from 'sequelize-typescript';
import { SchoolEntity } from 'src/school/school.entity';
export declare class LevelTahfidzEntity extends Model {
    id: number;
    name: string;
    id_school: number;
    sertifikat_url: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    school: SchoolEntity;
}
