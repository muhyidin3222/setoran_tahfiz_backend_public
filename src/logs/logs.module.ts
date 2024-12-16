import { Module } from '@nestjs/common';
import { logs_provider } from 'src/common/provider/master-provider-model';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
  imports: [],
  providers: [LogsService, logs_provider],
  exports: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
