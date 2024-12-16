import { Module } from '@nestjs/common';
import {
  achievement_provider,
  guide_tahfidz_provider,
  level_tahfidz_provider,
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationModule } from 'src/notification/notification.module';
import { SetoranTahfidzController } from './setoran-tahfidz.controller';
import { SetoranTahfidzService } from './setoran-tahfidz.service';
import { ConfigModule } from 'src/common/library/config.module';
import { ConfigService } from 'src/common/library/config.service';

@Module({
  imports: [NotificationModule, ConfigModule],
  providers: [
    SetoranTahfidzService,
    user_setoran_provider,
    user_provider,
    student_provider,
    guide_tahfidz_provider,
    achievement_provider,
    level_tahfidz_provider,
    ConfigService,
    // config_provider
  ],
  exports: [SetoranTahfidzService],
  controllers: [SetoranTahfidzController],
})
export class SetoranTahfidzModule {}
