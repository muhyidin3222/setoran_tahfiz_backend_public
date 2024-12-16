import { Module } from '@nestjs/common';
import {
  tag_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [],
  providers: [TagService, tag_provider, user_provider],
  exports: [TagService],
  controllers: [TagController],
})
export class TagModule {}
