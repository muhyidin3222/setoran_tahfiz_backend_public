import { Module } from '@nestjs/common';
import {
  berita_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationModule } from 'src/notification/notification.module';
import { BeritaController } from './berita.controller';
import { BeritaService } from './berita.service';

@Module({
  imports: [NotificationModule],
  providers: [BeritaService, berita_provider, user_provider],
  exports: [BeritaService],
  controllers: [BeritaController],
})
export class BeritaModule {}
