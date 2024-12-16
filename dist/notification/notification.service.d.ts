import { UserEntity } from 'src/user/user.entity';
import { NotificationEntity } from './notification.entity';
export declare class NotificationService {
    private notificationRepository;
    private userRepository;
    constructor(notificationRepository: typeof NotificationEntity, userRepository: typeof UserEntity);
    detailService(param: any): Promise<NotificationEntity>;
    getService(query: any): Promise<{
        rows: NotificationEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<NotificationEntity | any>;
    updateService(body: NotificationEntity | any): Promise<NotificationEntity>;
    createService(body: NotificationEntity | any): Promise<any>;
    createAllNotifService(body: any): Promise<any>;
    createNotifOneService(body: any): Promise<any>;
}
