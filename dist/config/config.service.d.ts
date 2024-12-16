import { ConfigEntity } from './config.entity';
export declare class ConfigService {
    private configRepository;
    constructor(configRepository: typeof ConfigEntity);
    detailService(param: any): Promise<ConfigEntity>;
    getService(): Promise<ConfigEntity>;
    deleteService(id: number): Promise<ConfigEntity | any>;
    updateService(body: ConfigEntity | any): Promise<ConfigEntity>;
    createService(body: ConfigEntity | any): Promise<ConfigEntity>;
}
