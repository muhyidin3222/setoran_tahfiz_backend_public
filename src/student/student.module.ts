import { Module } from '@nestjs/common';
import {
  achievement_provider,
  master_class_provider,
  school_provider,
  student_provider,
  user_class_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationModule } from 'src/notification/notification.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [NotificationModule],
  providers: [
    StudentService,
    student_provider,
    user_provider,
    user_class_provider,
    master_class_provider,
    school_provider,
    user_setoran_provider,
    achievement_provider,
  ],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
