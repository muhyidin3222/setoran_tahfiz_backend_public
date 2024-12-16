import { Module } from '@nestjs/common';
import {
  notification_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [],
  providers: [NotificationService, notification_provider, user_provider],
  exports: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
