import { Inject, Injectable } from '@nestjs/common';
import { logs_provider } from 'src/common/provider/master-provider-model';
import { LogsEntity } from './logs.entity';

@Injectable()
export class LogsService {
  constructor(
    @Inject(logs_provider.provide)
    private logsRepository: typeof LogsEntity,
  ) {}
  async createService(body: LogsEntity | any): Promise<LogsEntity> {
    console.log(body);
    const resFindSeller = await this.logsRepository.create(body);
    return resFindSeller;
  }
}
