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

const user_provider = {
  provide: 'USER_REPOSITORY',
  useValue: UserEntity,
};
const user_class_provider = {
  provide: 'USER_CLASS_REPOSITORY',
  useValue: UserClassEntity,
};
const master_class_provider = {
  provide: 'MASTER_CLASS_REPOSITORY',
  useValue: MasterClassEntity,
};
const admin_user_provider = {
  provide: 'ADMIN_USER_REPOSITORY',
  useValue: AdminUserEntity,
};
const berita_provider = {
  provide: 'BERITA_REPOSITORY',
  useValue: BeritaEntity,
};
const user_setoran_provider = {
  provide: 'USER_SETORAN_REPOSITORY',
  useValue: UserSetoranEntity,
};
const config_provider = {
  provide: 'CONFIG_REPOSITORY',
  useValue: ConfigEntity,
};
const tag_provider = {
  provide: 'TAG_REPOSITORY',
  useValue: TagEntity,
};
const level_tahfidz_provider = {
  provide: 'LEVEL_TAHFIDZ_REPOSITORY',
  useValue: LevelTahfidzEntity,
};
const notification_provider = {
  provide: 'NOTIFICATION_REPOSITORY',
  useValue: NotificationEntity,
};
const student_provider = {
  provide: 'STUDENT_REPOSITORY',
  useValue: StudentEntity,
};
const school_provider = {
  provide: 'SCHOOL_REPOSITORY',
  useValue: SchoolEntity,
};
const payment_provider = {
  provide: 'PAYMENT_REPOSITORY',
  useValue: PaymentEntity,
};
const period_provider = {
  provide: 'PERIOD_REPOSITORY',
  useValue: PeriodEntity,
};
const guide_tahfidz_provider = {
  provide: 'GUIDE_TAHFIDZ_REPOSITORY',
  useValue: GuideTahfidzEntity,
};
const ustadz_class_provider = {
  provide: 'USTADZ_CLASS_REPOSITORY',
  useValue: UstadzClassEntity,
};
const achievement_provider = {
  provide: 'ACHIEVEMENT_REPOSITORY',
  useValue: AchievementEntity,
};
const logs_provider = {
  provide: 'LOGS_REPOSITORY',
  useValue: LogsEntity,
};
export {
  student_provider,
  user_provider,
  admin_user_provider,
  berita_provider,
  config_provider,
  tag_provider,
  notification_provider,
  school_provider,
  user_class_provider,
  master_class_provider,
  user_setoran_provider,
  level_tahfidz_provider,
  payment_provider,
  period_provider,
  guide_tahfidz_provider,
  ustadz_class_provider,
  achievement_provider,
  logs_provider,
};
