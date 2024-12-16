import { Inject, Injectable } from '@nestjs/common';
import { tag_provider } from 'src/common/provider/master-provider-model';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject(tag_provider.provide)
    private tagRepository: typeof TagEntity,
  ) {}

  async detailService(param: any): Promise<TagEntity> {
    const resFindSeller = await this.tagRepository.findOne(param);
    return resFindSeller;
  }

  async getService(query): Promise<{ rows: TagEntity[]; count: number }> {
    const resFindSeller = await this.tagRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'name'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<TagEntity | any> {
    const resFindSeller = await this.tagRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(body: TagEntity | any): Promise<TagEntity> {
    await this.tagRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: TagEntity | any): Promise<TagEntity> {
    const resFindSeller = await this.tagRepository.create(body);
    return resFindSeller;
  }
}
