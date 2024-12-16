import { Inject, Injectable } from '@nestjs/common';
import { berita_provider } from 'src/common/provider/master-provider-model';
import { NotificationService } from 'src/notification/notification.service';
import { ParamCreate, ParamUpdate } from './berita.dto';
import { BeritaEntity } from './berita.entity';

@Injectable()
export class BeritaService {
  constructor(
    @Inject(berita_provider.provide)
    private beritaRepository: typeof BeritaEntity,
    private notificationService: NotificationService,
  ) {}

  async detailService(param: any): Promise<BeritaEntity> {
    const resFindSeller = await this.beritaRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query: any,
  ): Promise<{ rows: BeritaEntity[]; count: number }> {
    const resFindSeller = await this.beritaRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'title', 'image', 'description', 'created_at'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(where: any): Promise<BeritaEntity | any> {
    const resFindSeller = await this.beritaRepository.destroy({
      where: where,
    });
    return resFindSeller;
  }

  async updateService(body: ParamUpdate | any): Promise<BeritaEntity> {
    await this.beritaRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async updateAdminService(
    body: ParamUpdate | any,
    where: any,
  ): Promise<BeritaEntity> {
    await this.beritaRepository.update(body, {
      where: where,
    });
    return body;
  }

  async createService(body: ParamCreate | any): Promise<BeritaEntity> {
    const resCreated = await this.beritaRepository.create(body);
    this.notificationService.createAllNotifService({
      type: 'BERITA',
      title: body.title,
      id: resCreated?.id,
      id_school: body.id_school,
    });
    return resCreated;
  }
}
