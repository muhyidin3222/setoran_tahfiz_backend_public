import { Model } from 'sequelize-typescript';
export declare class ConfigEntity extends Model {
    id: number;
    version_android: string;
    version_ios: string;
    visi: string;
    misi: string;
    banner1: string;
    banner2: string;
    banner3: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
