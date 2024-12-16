import { NotificationService } from './notification.service';
import { ParamGet } from './notification.dto';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    get(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
