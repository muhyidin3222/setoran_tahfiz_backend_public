import { Module } from '@nestjs/common';
import {
  period_provider,
  school_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
  imports: [],
  providers: [SchoolService, school_provider, period_provider, user_provider],
  exports: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
