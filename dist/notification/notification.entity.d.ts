import { Model } from 'sequelize-typescript';
import { BeritaEntity } from 'src/berita/berita.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class NotificationEntity extends Model {
    id: number;
    name: string;
    description: string;
    screen: string;
    id_berita: number;
    id_setoran: number;
    id_sertifikat: number;
    id_user: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    berita: BeritaEntity;
    userSetoran: UserSetoranEntity;
    user: UserEntity;
}
