import { Module } from '@nestjs/common';
import {
  achievement_provider,
  student_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationModule } from 'src/notification/notification.module';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';

@Module({
  imports: [NotificationModule],
  providers: [
    AchievementService,
    achievement_provider,
    user_provider,
    student_provider,
  ],
  exports: [AchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
