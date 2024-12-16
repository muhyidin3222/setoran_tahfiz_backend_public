import { TagEntity } from './tag.entity';
export declare class TagService {
    private tagRepository;
    constructor(tagRepository: typeof TagEntity);
    detailService(param: any): Promise<TagEntity>;
    getService(query: any): Promise<{
        rows: TagEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<TagEntity | any>;
    updateService(body: TagEntity | any): Promise<TagEntity>;
    createService(body: TagEntity | any): Promise<TagEntity>;
}
