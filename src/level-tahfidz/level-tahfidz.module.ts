import { Module } from '@nestjs/common';
import {
  level_tahfidz_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { LevelTahfidzController } from './level-tahfidz.controller';
import { LevelTahfidzService } from './level-tahfidz.service';

@Module({
  imports: [],
  providers: [LevelTahfidzService, level_tahfidz_provider, user_provider],
  exports: [LevelTahfidzService],
  controllers: [LevelTahfidzController],
})
export class LevelTahfidzModule {}
