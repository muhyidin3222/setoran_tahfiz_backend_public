import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { ParamCreate, ParamUpdate } from './setoran-tahfidz.dto';
import { UserSetoranEntity } from './user-setoran.entity';
import { NotificationService } from 'src/notification/notification.service';
import { AchievementEntity } from 'src/achievement/achievement.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { ConfigService } from 'src/common/library/config.service';
export declare class SetoranTahfidzService {
    private userSetoranRepository;
    private studentRepository;
    private guideTahfidzRepository;
    private achievementRepository;
    private levelTahfidzRepository;
    private userRepository;
    private readonly notificationService;
    private readonly configService;
    constructor(userSetoranRepository: typeof UserSetoranEntity, studentRepository: typeof StudentEntity, guideTahfidzRepository: typeof GuideTahfidzEntity, achievementRepository: typeof AchievementEntity, levelTahfidzRepository: typeof LevelTahfidzEntity, userRepository: typeof UserEntity, notificationService: NotificationService, configService: ConfigService);
    detailService(param: any): Promise<UserSetoranEntity>;
    getService(query: any): Promise<{
        rows: UserSetoranEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<UserSetoranEntity | any>;
    updateService(body: ParamUpdate | any): Promise<UserSetoranEntity>;
    createService(body: ParamCreate | any): Promise<UserSetoranEntity>;
    createSetoranTahfidz(body: any): Promise<UserSetoranEntity>;
    createSertifikat({ id_student, id_level_tahfidz, id_user, noLevelTahfidz, id_school, full_name }: {
        id_student: number;
        id_level_tahfidz: number;
        id_user: number;
        noLevelTahfidz: number;
        id_school: number;
        full_name: string;
    }): Promise<any>;
}
