import { NotificationService } from 'src/notification/notification.service';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { AchievementEntity } from './achievement.entity';
export declare class AchievementService {
    private achievementRepository;
    private studentRepository;
    private readonly notificationService;
    private userRepository;
    constructor(achievementRepository: typeof AchievementEntity, studentRepository: typeof StudentEntity, notificationService: NotificationService, userRepository: typeof UserEntity);
    detailService(param: any): Promise<AchievementEntity>;
    getService(query: any): Promise<{
        rows: AchievementEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<AchievementEntity | any>;
    updateService(body: AchievementEntity | any): Promise<AchievementEntity>;
    createService(body: AchievementEntity | any): Promise<AchievementEntity>;
    sertifikat(id: string): Promise<any>;
}
