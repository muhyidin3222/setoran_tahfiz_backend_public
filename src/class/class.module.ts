import { Module } from '@nestjs/common';
import {
  master_class_provider,
  student_provider,
  user_class_provider,
  user_provider,
  ustadz_class_provider,
} from 'src/common/provider/master-provider-model';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [],
  providers: [
    ClassService,
    student_provider,
    master_class_provider,
    user_class_provider,
    user_provider,
    ustadz_class_provider,
  ],
  exports: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
