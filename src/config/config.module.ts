import { Module } from '@nestjs/common';
import { config_provider } from 'src/common/provider/master-provider-model';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

@Module({
  imports: [],
  providers: [ConfigService, config_provider],
  exports: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigDataModule {}
