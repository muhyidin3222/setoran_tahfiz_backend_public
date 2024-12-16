import { Module } from '@nestjs/common';
import {
  admin_user_provider,
  level_tahfidz_provider,
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationModule } from 'src/notification/notification.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [NotificationModule],
  providers: [
    UserService,
    user_provider,
    admin_user_provider,
    student_provider,
    user_setoran_provider,
    level_tahfidz_provider,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
