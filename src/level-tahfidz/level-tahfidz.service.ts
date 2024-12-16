import { Inject, Injectable } from '@nestjs/common';
import { level_tahfidz_provider } from 'src/common/provider/master-provider-model';
import { LevelTahfidzEntity } from './level-tahfidz.entity';

@Injectable()
export class LevelTahfidzService {
  constructor(
    @Inject(level_tahfidz_provider.provide)
    private levelTahfidzRepository: typeof LevelTahfidzEntity,
  ) {}

  async detailService(param: any): Promise<LevelTahfidzEntity> {
    const resFindSeller = await this.levelTahfidzRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query,
  ): Promise<{ rows: LevelTahfidzEntity[]; count: number }> {
    const resFindSeller = await this.levelTahfidzRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'name'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(where: any): Promise<LevelTahfidzEntity | any> {
    const resFindSeller = await this.levelTahfidzRepository.destroy({
      where: where,
    });
    return resFindSeller;
  }

  async updateService(
    body: LevelTahfidzEntity | any,
  ): Promise<LevelTahfidzEntity> {
    await this.levelTahfidzRepository.update(body, {
      where: {
        id: body?.id,
        id_school: body?.id_school,
      },
    });
    return body;
  }

  async createService(
    body: LevelTahfidzEntity | any,
  ): Promise<LevelTahfidzEntity> {
    const resFindSeller = await this.levelTahfidzRepository.create(body);
    return resFindSeller;
  }
}
