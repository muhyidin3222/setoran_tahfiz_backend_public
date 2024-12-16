import { Inject, Injectable } from '@nestjs/common';
import {
  master_class_provider,
  user_class_provider,
} from 'src/common/provider/master-provider-model';
import { MasterParamCreate, MasterParamUpdate } from './class.dto';
import { MasterClassEntity } from './master_class.entity';
import { UserClassEntity } from './user_class.entity';

@Injectable()
export class ClassService {
  constructor(
    @Inject(master_class_provider.provide)
    private masterSchoolRepository: typeof MasterClassEntity,
    @Inject(user_class_provider.provide)
    private userClassRepository: typeof UserClassEntity,
  ) {}

  async detailMasterClassService(param: any): Promise<MasterClassEntity> {
    const resFindSeller = await this.masterSchoolRepository.findOne(param);
    return resFindSeller;
  }

  async getMasterClassService(
    query: any,
  ): Promise<{ rows: MasterClassEntity[]; count: number }> {
    const resFindSeller = await this.masterSchoolRepository.findAndCountAll({
      ...query,
      attributes: [
        'id',
        'name',
        'total_student',
        'school_year_start',
        'school_year_end',
      ],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteMasterClassService(where: any): Promise<MasterClassEntity | any> {
    const resFindSeller = await this.masterSchoolRepository.destroy({
      where: where,
    });
    return resFindSeller;
  }

  async updateMasterClassService(
    body: MasterParamUpdate | any,
  ): Promise<MasterClassEntity> {
    await this.masterSchoolRepository.update(body, {
      where: {
        id: body?.id,
        id_school: body?.id_school,
      },
    });
    return body;
  }

  async createMasterClassService(
    body: MasterParamCreate | any,
  ): Promise<MasterClassEntity> {
    const resCreated = await this.masterSchoolRepository.create(body);
    return resCreated;
  }

  async detailUserClassService(param: any): Promise<UserClassEntity> {
    const resFindSeller = await this.userClassRepository.findOne(param);
    return resFindSeller;
  }

  async getUserClassService(
    query: any,
  ): Promise<{ rows: UserClassEntity[]; count: number }> {
    const resFindSeller = await this.userClassRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'name', 'created_at'],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteUserClassService(id: number): Promise<UserClassEntity | any> {
    const resFindSeller = await this.userClassRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateUserClassService(
    body: MasterParamUpdate | any,
  ): Promise<UserClassEntity> {
    await this.userClassRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createUserClassService(
    body: MasterParamCreate | any,
  ): Promise<UserClassEntity> {
    const resCreated = await this.userClassRepository.create(body);
    return resCreated;
  }
}
