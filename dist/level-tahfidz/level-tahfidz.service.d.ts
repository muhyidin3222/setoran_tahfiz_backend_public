import { LevelTahfidzEntity } from './level-tahfidz.entity';
export declare class LevelTahfidzService {
    private levelTahfidzRepository;
    constructor(levelTahfidzRepository: typeof LevelTahfidzEntity);
    detailService(param: any): Promise<LevelTahfidzEntity>;
    getService(query: any): Promise<{
        rows: LevelTahfidzEntity[];
        count: number;
    }>;
    deleteService(where: any): Promise<LevelTahfidzEntity | any>;
    updateService(body: LevelTahfidzEntity | any): Promise<LevelTahfidzEntity>;
    createService(body: LevelTahfidzEntity | any): Promise<LevelTahfidzEntity>;
}
