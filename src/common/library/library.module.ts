import { Module } from '@nestjs/common';
import { ValidationTokenApp } from './validation-token.service';
import { ConfigModule } from './config.module';
import { UploadService } from './upload';

@Module({
  imports: [ConfigModule],
  providers: [ValidationTokenApp, UploadService],
  exports: [ValidationTokenApp, UploadService],
  controllers: [],
})
export class LibraryModule {}
