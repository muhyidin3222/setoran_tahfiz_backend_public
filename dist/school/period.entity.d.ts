import { Model } from 'sequelize-typescript';
export declare class PeriodEntity extends Model {
    id: number;
    period_end: string;
    period_start: string;
    month: number;
    total_price: number;
    id_school: number;
    id_payment: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
