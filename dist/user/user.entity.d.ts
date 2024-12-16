import { Model } from 'sequelize-typescript';
import { UstadzClassEntity } from 'src/class/ustadz-class.entity';
export declare class UserEntity extends Model {
    id: number;
    name: string;
    email: string;
    phone: string;
    step_register: number;
    password: string;
    id_google: string;
    photo: string;
    gender: string;
    fcm_token: string;
    token: string;
    date_of_birth: string;
    about: string;
    type_user: string;
    version: string;
    location: string;
    id_school: number;
    id_student: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    userClass: UstadzClassEntity;
}
