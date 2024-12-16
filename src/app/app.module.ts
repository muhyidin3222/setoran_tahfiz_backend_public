import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '../common/library/config.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { LibraryModule } from '../common/library/library.module';
import { HttpExceptionFilter } from 'src/common/library/http-exception.filter';
import { DatabaseModule } from 'src/database/database.module';
import { BeritaModule } from 'src/berita/berita.module';
import { NotificationModule } from 'src/notification/notification.module';
import { TagModule } from 'src/tag/tag.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import {
  config_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { ConfigDataModule } from 'src/config/config.module';
import { StudentModule } from 'src/student/student.module';
import { ClassModule } from 'src/class/class.module';
import { LevelTahfidzModule } from 'src/level-tahfidz/level-tahfidz.module';
import { PaymentModule } from 'src/payment/payment.module';
import { SchoolModule } from 'src/school/school.module';
import { SetoranTahfidzModule } from 'src/setoran-tahfidz/setoran-tahfidz.module';
import { GuideTahfidzModule } from 'src/guide-tahfidz/guide-tahfidz.module';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { ConfigService as ConfigServiceEnv } from 'src/common/library/config.service';
import { AchievementModule } from 'src/achievement/achievement.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    ConfigModule,
    ConfigDataModule,
    AuthModule,
    LibraryModule,
    DatabaseModule,
    BeritaModule,
    NotificationModule,
    TagModule,
    UserModule,
    ClassModule,
    LevelTahfidzModule,
    PaymentModule,
    AchievementModule,
    SchoolModule,
    SetoranTahfidzModule,
    StudentModule,
    GuideTahfidzModule,
    LogsModule,
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    config_provider,
    user_provider,
    user_setoran_provider,
  ],
  exports: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const configService = new ConfigServiceEnv();
    const log: any = configService.get('LOGGER');
    if (log) consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
