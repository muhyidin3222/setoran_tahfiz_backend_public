import { GuideTahfidzEntity } from './guide-tahfidz.entity';
export declare class GuideTahfidzService {
    private guideTahfidzRepository;
    constructor(guideTahfidzRepository: typeof GuideTahfidzEntity);
    detailService(param: any): Promise<GuideTahfidzEntity>;
    getService(query: any): Promise<{
        rows: GuideTahfidzEntity[];
        count: number;
    }>;
    getServiceLastTahfidz(query: any): Promise<GuideTahfidzEntity[]>;
    deleteService(id: number): Promise<GuideTahfidzEntity | any>;
    updateService(body: GuideTahfidzEntity | any): Promise<GuideTahfidzEntity>;
    createService(body: GuideTahfidzEntity | any): Promise<GuideTahfidzEntity>;
    createServiceArray(body: GuideTahfidzEntity | any): Promise<GuideTahfidzEntity[]>;
}
