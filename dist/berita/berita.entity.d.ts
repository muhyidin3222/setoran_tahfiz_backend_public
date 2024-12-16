import { Model } from 'sequelize-typescript';
import { TagEntity } from 'src/tag/tag.entity';
export declare class BeritaEntity extends Model {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    top: number;
    id_school: number;
    id_tag: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    tag: TagEntity;
}
