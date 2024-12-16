import { AdminUserEntity } from 'src/user/admin-user.entity';
import { UserEntity } from 'src/user/user.entity';
import { BeritaEntity } from 'src/berita/berita.entity';
import { ConfigEntity } from 'src/config/config.entity';
import { TagEntity } from 'src/tag/tag.entity';
import { NotificationEntity } from 'src/notification/notification.entity';
import { StudentEntity } from 'src/student/student.entity';
import { SchoolEntity } from 'src/school/school.entity';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserClassEntity } from 'src/class/user_class.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { PaymentEntity } from 'src/payment/payment.entity';
import { PeriodEntity } from 'src/school/period.entity';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { UstadzClassEntity } from 'src/class/ustadz-class.entity';
import { AchievementEntity } from 'src/achievement/achievement.entity';
import { LogsEntity } from 'src/logs/logs.entity';
declare const user_provider: {
    provide: string;
    useValue: typeof UserEntity;
};
declare const user_class_provider: {
    provide: string;
    useValue: typeof UserClassEntity;
};
declare const master_class_provider: {
    provide: string;
    useValue: typeof MasterClassEntity;
};
declare const admin_user_provider: {
    provide: string;
    useValue: typeof AdminUserEntity;
};
declare const berita_provider: {
    provide: string;
    useValue: typeof BeritaEntity;
};
declare const user_setoran_provider: {
    provide: string;
    useValue: typeof UserSetoranEntity;
};
declare const config_provider: {
    provide: string;
    useValue: typeof ConfigEntity;
};
declare const tag_provider: {
    provide: string;
    useValue: typeof TagEntity;
};
declare const level_tahfidz_provider: {
    provide: string;
    useValue: typeof LevelTahfidzEntity;
};
declare const notification_provider: {
    provide: string;
    useValue: typeof NotificationEntity;
};
declare const student_provider: {
    provide: string;
    useValue: typeof StudentEntity;
};
declare const school_provider: {
    provide: string;
    useValue: typeof SchoolEntity;
};
declare const payment_provider: {
    provide: string;
    useValue: typeof PaymentEntity;
};
declare const period_provider: {
    provide: string;
    useValue: typeof PeriodEntity;
};
declare const guide_tahfidz_provider: {
    provide: string;
    useValue: typeof GuideTahfidzEntity;
};
declare const ustadz_class_provider: {
    provide: string;
    useValue: typeof UstadzClassEntity;
};
declare const achievement_provider: {
    provide: string;
    useValue: typeof AchievementEntity;
};
declare const logs_provider: {
    provide: string;
    useValue: typeof LogsEntity;
};
export { student_provider, user_provider, admin_user_provider, berita_provider, config_provider, tag_provider, notification_provider, school_provider, user_class_provider, master_class_provider, user_setoran_provider, level_tahfidz_provider, payment_provider, period_provider, guide_tahfidz_provider, ustadz_class_provider, achievement_provider, logs_provider, };
