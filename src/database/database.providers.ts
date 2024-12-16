import { Sequelize } from 'sequelize-typescript';
import { BeritaEntity } from 'src/berita/berita.entity';
import { NotificationEntity } from 'src/notification/notification.entity';
import { TagEntity } from 'src/tag/tag.entity';
import { AdminUserEntity } from 'src/user/admin-user.entity';
import { UserEntity } from 'src/user/user.entity';
import { ConfigService } from 'src/common/library/config.service';
import { ConfigModule } from 'src/common/library/config.module';
import { ConfigEntity } from 'src/config/config.entity';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserClassEntity } from 'src/class/user_class.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { PaymentEntity } from 'src/payment/payment.entity';
import { SchoolEntity } from 'src/school/school.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { PeriodEntity } from 'src/school/period.entity';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { UstadzClassEntity } from 'src/class/ustadz-class.entity';
import { AchievementEntity } from 'src/achievement/achievement.entity';
import { LogsEntity } from 'src/logs/logs.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const host: string = configService.get('HOST');
      const username: string = configService.get('USERNAME');
      const password: string = configService.get('PASSWORD');
      const database: string = configService.get('DATABASE');

      const databaseSetup = {
        host,
        username,
        password,
      };

      const sequelize = new Sequelize({
        dialect: 'mysql',
        logging: false,
        port: 12738,
        ...databaseSetup,
        database,
        define: {
          freezeTableName: true,
          timestamps: false,
        },
      });
      sequelize.addModels([
        BeritaEntity,
        TagEntity,
        UserEntity,
        NotificationEntity,
        AdminUserEntity,
        ConfigEntity,
        MasterClassEntity,
        UserClassEntity,
        LevelTahfidzEntity,
        PaymentEntity,
        SchoolEntity,
        StudentEntity,
        UserSetoranEntity,
        PeriodEntity,
        GuideTahfidzEntity,
        UstadzClassEntity,
        AchievementEntity,
        LogsEntity,
      ]);
      // await sequelize.sync({ force: true });
      // await sequelize.sync();
      return sequelize;
    },
  },
];
