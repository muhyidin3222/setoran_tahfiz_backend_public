import { LogsService } from './logs.service';
import { ParamCreate } from './logs.dto';
export declare class LogsController {
    private levelTahfidzService;
    constructor(levelTahfidzService: LogsService);
    create(body: ParamCreate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
