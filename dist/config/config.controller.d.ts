import { ConfigService } from './config.service';
import { ParamUpdate } from './config.dto';
export declare class ConfigController {
    private configService;
    constructor(configService: ConfigService);
    get(): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    update(body: ParamUpdate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    delete(id: number): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
