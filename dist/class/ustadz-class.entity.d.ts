import { Model } from 'sequelize-typescript';
export declare class UstadzClassEntity extends Model {
    id: number;
    id_ustadz: number;
    id_master_class: number;
    id_school: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
