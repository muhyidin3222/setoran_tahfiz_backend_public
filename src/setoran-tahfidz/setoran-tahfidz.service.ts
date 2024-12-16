import { Inject, Injectable } from '@nestjs/common';
import {
  achievement_provider,
  guide_tahfidz_provider,
  level_tahfidz_provider,
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { ParamCreate, ParamUpdate } from './setoran-tahfidz.dto';
import { UserSetoranEntity } from './user-setoran.entity';
import { NotificationService } from 'src/notification/notification.service';
import { AchievementEntity } from 'src/achievement/achievement.entity';
import { v4 } from 'uuid';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { ConfigService } from 'src/common/library/config.service';

@Injectable()
export class SetoranTahfidzService {
  constructor(
    @Inject(user_setoran_provider.provide)
    private userSetoranRepository: typeof UserSetoranEntity,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    @Inject(guide_tahfidz_provider.provide)
    private guideTahfidzRepository: typeof GuideTahfidzEntity,
    @Inject(achievement_provider.provide)
    private achievementRepository: typeof AchievementEntity,
    @Inject(level_tahfidz_provider.provide)
    private levelTahfidzRepository: typeof LevelTahfidzEntity,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    private readonly notificationService: NotificationService,
    private readonly configService: ConfigService,
  ) { }

  async detailService(param: any): Promise<UserSetoranEntity> {
    const resFindSetoran = await this.userSetoranRepository.findOne({
      ...param,
      attributes: [
        'id',
        'nilai',
        'incorrect',
        'sound',
        'message',
        'image',
        'created_at',
        'id_user',
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: StudentEntity,
          as: 'studentMeyimak',
          attributes: ['id', 'full_name', 'photo'],
        },
        {
          model: UserEntity,
          as: 'userMeyimak',
          attributes: ['id', 'name', 'photo', 'type_user'],
          required: false,
        },
        {
          model: GuideTahfidzEntity,
          as: 'guideTahfidz',
          attributes: ['id', 'name', 'description', 'no'],
          required: true,
        },
        {
          model: StudentEntity,
          as: 'student',
          attributes: ['id', 'full_name', 'photo'],
          required: true,
        },
      ],
    });
    return resFindSetoran;
  }

  async getService(
    query: any,
  ): Promise<{ rows: UserSetoranEntity[]; count: number }> {
    const resFindSetoran = await this.userSetoranRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'nilai', 'image', 'message', 'incorrect', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: StudentEntity,
          as: 'studentMeyimak',
          attributes: ['id', 'full_name'],
        },
        {
          model: UserEntity,
          as: 'userMeyimak',
          attributes: ['id', 'name', 'photo', 'type_user'],
          required: false,
        },
        {
          model: GuideTahfidzEntity,
          as: 'guideTahfidz',
          attributes: ['id', 'name', 'no', 'description'],
          required: true,
        },
        {
          model: StudentEntity,
          as: 'student',
          attributes: ['id', 'full_name', 'photo'],
        },
        {
          model: LevelTahfidzEntity,
          as: 'levelTahfidz',
          attributes: ['id', 'name'],
        },
      ],
    });

    return resFindSetoran;
  }

  async deleteService(id: number): Promise<UserSetoranEntity | any> {
    const resFindSetoran = await this.userSetoranRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSetoran;
  }

  async updateService(body: ParamUpdate | any): Promise<UserSetoranEntity> {
    await this.userSetoranRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: ParamCreate | any): Promise<UserSetoranEntity> {
    const resCreated = await this.userSetoranRepository.create(body);
    return resCreated;
  }

  async createSetoranTahfidz(body: any): Promise<UserSetoranEntity> {
    const getUserStudent = await this.studentRepository.findOne({
      where: {
        id: body?.id_student,
      },
      attributes: ['email_user', 'id_user'],
    });
    let getUser: any = {};
    const { id_user, email_user } = getUserStudent?.dataValues || {};
    if (id_user) {
      body.id_user = id_user;
    } else {
      if (email_user) {
        const where: any = {};
        where.email = email_user;
        getUser = await this.userRepository.findOne({
          where: where,
          attributes: ['id'],
        });
        const { id } = getUser?.dataValues || {};
        if (id) {
          body.id_user = id;
        }
      }
    }
    const guideTahfidz = await this.guideTahfidzRepository.findOne({
      where: {
        id: body?.id_guide_tahfidz,
      },
      attributes: ['name', 'no', 'id_level_tahfidz'],
    });
    if (!body.id_level_tahfidz) {
      body.id_level_tahfidz = guideTahfidz.id_level_tahfidz;
    }
    const resCreated = await this.userSetoranRepository.create(body);
    let getStudent: any = {};
    if (body?.id_student) {
      getStudent = await this.studentRepository.findOne({
        where: {
          id: body?.id_student,
        },
        attributes: ['id', 'full_name', 'id_school'],
      });
    }
    const { full_name } = getStudent?.dataValues || {};
    const { name, no } = guideTahfidz?.dataValues || {};

    await this.createSertifikat({
      id_student: body?.id_student,
      id_level_tahfidz: body.id_level_tahfidz,
      id_user: id_user,
      noLevelTahfidz: no,
      id_school: getStudent?.dataValues.id_school,
      full_name: getStudent?.dataValues.full_name,
    });
    await this.notificationService.createNotifOneService({
      title: `${full_name || 'Siswa'} Baru Saja Meyetorkan`,
      id_user: id_user,
      type: 'setoran',
      description: full_name
        ? `${full_name} telah meyetorkan ${name}`
        : `Siswa telah meyetorkan ${name}, check aplikasi`,
      id_setoran: resCreated?.dataValues?.id,
    });
    return resCreated;
  }

  async createSertifikat({
    id_student,
    id_level_tahfidz,
    id_user,
    noLevelTahfidz,
    id_school,
    full_name
  }: {
    id_student: number;
    id_level_tahfidz: number;
    id_user: number;
    noLevelTahfidz: number;
    id_school: number,
    full_name: string
  }): Promise<any> {
    console.log('create sertifikat')
    const checkAchievement = await this.achievementRepository.count({
      where: {
        id_student,
        id_level_tahfidz,
      },
    });
    console.log(checkAchievement)
    if (!checkAchievement) {
      console.log('belum dibuat sertifikat')
      const noTahfidz = await this.guideTahfidzRepository.findOne({
        where: {
          id_level_tahfidz,
        },
        attributes: ["no"],
        order: [['no', 'DESC']],
      });
      console.log({ noLevelTahfidz: noTahfidz?.dataValues?.no, noLevelMurid: noLevelTahfidz })
      if (noTahfidz?.dataValues?.no === noLevelTahfidz) {
        console.log('setoran sudah selesai')
        const URL_API = await this.configService.get('URL_API');
        const levelTahfidz = await this.levelTahfidzRepository.findOne({
          where: {
            id: id_level_tahfidz,
          },
          attributes: ['name'],
        });
        const uuid = v4();
        const createAchievement = await this.achievementRepository.create({
          id_student: id_student,
          uuid: uuid,
          id_level_tahfidz,
          id_school: id_school,
          name: `Sertifikat ${levelTahfidz?.name}`,
          image_achievement: `${URL_API}/achievement/sertifikat/${uuid}`,
        });
        await this.notificationService.createNotifOneService({
          title: `Sertifikat ${levelTahfidz?.name} buat ${full_name || 'Siswa'
            }`,
          id_user: id_user,
          type: 'sertifikat',
          description: full_name?.length
            ? `${full_name} telah mendapatkan sertifikat`
            : `Siswa telah mendapatkan sertifikat, check aplikasi`,
          id_sertifikat: createAchievement?.dataValues?.id,
        });
        console.log('sertifikat dibuat')
      }
    }
  }
}
