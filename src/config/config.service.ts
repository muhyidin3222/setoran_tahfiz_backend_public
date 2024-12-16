import { Inject, Injectable } from '@nestjs/common';
import { config_provider } from 'src/common/provider/master-provider-model';
import { ConfigEntity } from './config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(config_provider.provide)
    private configRepository: typeof ConfigEntity,
  ) {}

  async detailService(param: any): Promise<ConfigEntity> {
    const resFindSeller = await this.configRepository.findOne(param);
    return resFindSeller;
  }

  async getService(): Promise<ConfigEntity> {
    const resFindSeller = await this.configRepository.findOne({
      attributes: ['id', 'banner1', 'banner2', 'banner3'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<ConfigEntity | any> {
    const resFindSeller = await this.configRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(body: ConfigEntity | any): Promise<ConfigEntity> {
    await this.configRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: ConfigEntity | any): Promise<ConfigEntity> {
    const resFindSeller = await this.configRepository.create(body);
    return resFindSeller;
  }
}
