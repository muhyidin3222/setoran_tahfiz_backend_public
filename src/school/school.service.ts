import { Inject, Injectable } from '@nestjs/common';
import {
  period_provider,
  school_provider,
} from 'src/common/provider/master-provider-model';
import { PeriodEntity } from './period.entity';
import { ParamCreate, ParamUpdate } from './school.dto';
import { SchoolEntity } from './school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @Inject(school_provider.provide)
    private schoolRepository: typeof SchoolEntity,
    @Inject(period_provider.provide)
    private periodRepository: typeof PeriodEntity,
  ) {}

  async detailService(param: any): Promise<SchoolEntity> {
    const resFindSeller = await this.schoolRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query: any,
  ): Promise<{ rows: SchoolEntity[]; count: number }> {
    const resFindSeller = await this.schoolRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'name'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<SchoolEntity | any> {
    const resFindSeller = await this.schoolRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(body: ParamUpdate | any): Promise<SchoolEntity> {
    await this.schoolRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: ParamCreate | any): Promise<SchoolEntity> {
    const resCreated = await this.schoolRepository.create(body);
    return resCreated;
  }

  async detailPeriodService(param: any): Promise<PeriodEntity> {
    const resFindSeller = await this.periodRepository.findOne(param);
    return resFindSeller;
  }

  async getPeriodService(
    query: any,
  ): Promise<{ rows: PeriodEntity[]; count: number }> {
    const resFindSeller = await this.periodRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'title', 'image', 'description', 'created_at'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deletePeriodService(id: number): Promise<PeriodEntity | any> {
    const resFindSeller = await this.periodRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updatePeriodService(body: ParamUpdate | any): Promise<PeriodEntity> {
    await this.periodRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createPeriodService(body: ParamCreate | any): Promise<PeriodEntity> {
    const resCreated = await this.periodRepository.create(body);
    return resCreated;
  }
}
