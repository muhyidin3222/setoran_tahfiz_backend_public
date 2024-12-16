import { Module } from '@nestjs/common';
import {
  guide_tahfidz_provider,
  level_tahfidz_provider,
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { GuideTahfidzController } from './guide-tahfidz.controller';
import { GuideTahfidzService } from './guide-tahfidz.service';

@Module({
  imports: [],
  providers: [
    GuideTahfidzService,
    guide_tahfidz_provider,
    user_provider,
    user_setoran_provider,
    student_provider,
    level_tahfidz_provider,
  ],
  exports: [GuideTahfidzService],
  controllers: [GuideTahfidzController],
})
export class GuideTahfidzModule {}
