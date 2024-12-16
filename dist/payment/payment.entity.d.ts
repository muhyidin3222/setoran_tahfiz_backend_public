import { Model } from 'sequelize-typescript';
import { PeriodEntity } from 'src/school/period.entity';
import { SchoolEntity } from 'src/school/school.entity';
export declare class PaymentEntity extends Model {
    id: number;
    transaction_status: string;
    status_message: string;
    va: string;
    no_bank: string;
    nama_bank: string;
    amount: number;
    paid_at: string;
    additionalData: string;
    id_period: number;
    id_school: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    period: PeriodEntity;
    school: SchoolEntity;
}
