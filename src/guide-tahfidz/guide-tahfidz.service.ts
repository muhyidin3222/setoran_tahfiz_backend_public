import { Inject, Injectable } from '@nestjs/common';
import { guide_tahfidz_provider } from 'src/common/provider/master-provider-model';
import { GuideTahfidzEntity } from './guide-tahfidz.entity';

@Injectable()
export class GuideTahfidzService {
  constructor(
    @Inject(guide_tahfidz_provider.provide)
    private guideTahfidzRepository: typeof GuideTahfidzEntity,
  ) {}

  async detailService(param: any): Promise<GuideTahfidzEntity> {
    const resFindSeller = await this.guideTahfidzRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query,
  ): Promise<{ rows: GuideTahfidzEntity[]; count: number }> {
    const resFindSeller = await this.guideTahfidzRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'name', 'description', 'no', 'id_level_tahfidz'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async getServiceLastTahfidz(query): Promise<GuideTahfidzEntity[]> {
    const resFindSeller = await this.guideTahfidzRepository.findAll({
      ...query,
      attributes: ['id', 'description', 'name', 'no'],
      order: [['no', 'ASC']],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<GuideTahfidzEntity | any> {
    const resFindSeller = await this.guideTahfidzRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(
    body: GuideTahfidzEntity | any,
  ): Promise<GuideTahfidzEntity> {
    await this.guideTahfidzRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(
    body: GuideTahfidzEntity | any,
  ): Promise<GuideTahfidzEntity> {
    const resFindSeller = await this.guideTahfidzRepository.create(body);
    return resFindSeller;
  }

  async createServiceArray(
    body: GuideTahfidzEntity | any,
  ): Promise<GuideTahfidzEntity[]> {
    const resData = await Promise.all(
      body?.map(async (val) => {
        await this.guideTahfidzRepository.findOrCreate({
          where: val,
          defaults: val,
        });
      }),
    );
    return resData;
  }
}
