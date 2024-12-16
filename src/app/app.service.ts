import { Inject, Injectable } from '@nestjs/common';
import {
  config_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { ConfigEntity } from 'src/config/config.entity';
import { firebaseInit } from 'src/common/library/firebase';
import { UserEntity } from 'src/user/user.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { StudentEntity } from 'src/student/student.entity';
import _ from 'lodash';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(config_provider.provide)
    private configRepository: typeof ConfigEntity,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    @Inject(user_setoran_provider.provide)
    private userSetoranRepository: typeof UserSetoranEntity,
  ) {}

  main(): string {
    return 'success main api';
  }

  async home(): Promise<any> {
    const resHome = await this.configRepository.findOne({
      attributes: ['version_android', 'version_ios'],
    });
    return resHome;
  }

  async subscribe(id: any): Promise<any> {
    const getUser = await this.userRepository.findOne({
      where: {
        id,
      },
      attributes: ['fcm_token', 'id_school'],
    });
    const { id_school, fcm_token } = getUser?.dataValues || {};
    if (id_school && fcm_token?.length) {
      try {
        await firebaseInit
          .messaging()
          .subscribeToTopic([fcm_token], `BERITA${id_school.toString()}`);
        await firebaseInit.messaging().subscribeToTopic([fcm_token], 'GLOBAL');
      } catch (error) {
        // console.log(error, 'error');
      }
    }
    return;
  }

  async homeChart(id_school: number): Promise<any> {
    const resHome = await this.userSetoranRepository.findAndCountAll({
      attributes: ['id', 'id_student', 'incorrect', 'nilai'],
      include: [
        {
          model: StudentEntity,
          as: 'student',
          required: true,
          where: {
            id_school: id_school,
          },
          attributes: ['full_name'],
        },
        {
          model: GuideTahfidzEntity,
          as: 'guideTahfidz',
          required: true,
          attributes: ['name', 'description'],
        },
      ],
    });
    const resData = resHome.rows;
    const gruping: any = _.groupBy(resData, 'id_student');
    const countStudent = _.keys(gruping).map((value) => ({
      full_name: gruping[value][0]?.dataValues?.student?.full_name,
      count: gruping[value]?.length,
      dataSetoranTahfidz: gruping[value]?.map((value) => ({
        ...value?.dataValues?.guideTahfidz?.dataValues,
        incorrect: value?.dataValues?.incorrect,
        nilai: value?.dataValues?.nilai,
      })),
    }));
    const sortBy = _.sortBy(countStudent, [(value) => value.count]);
    return {
      rows: sortBy.reverse(),
      count: resHome.count,
    };
  }
}
