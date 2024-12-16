import { Model } from 'sequelize-typescript';
import { PeriodEntity } from './period.entity';
export declare class SchoolEntity extends Model {
    id: number;
    name: string;
    total_student: number;
    description: string;
    photo: string;
    id_period: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    period: PeriodEntity;
}
