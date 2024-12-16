import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  achievement_provider,
  student_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationService } from 'src/notification/notification.service';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { AchievementEntity } from './achievement.entity';
import downloadSertifikat from 'src/common/library/download_sertifikat';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';

@Injectable()
export class AchievementService {
  constructor(
    @Inject(achievement_provider.provide)
    private achievementRepository: typeof AchievementEntity,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    private readonly notificationService: NotificationService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  async detailService(param: any): Promise<AchievementEntity> {
    const resFindSeller = await this.achievementRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query,
  ): Promise<{ rows: AchievementEntity[]; count: number }> {
    const resFindSeller = await this.achievementRepository.findAndCountAll({
      ...query,
      attributes: [
        'id',
        'name',
        'image_achievement',
        'link_report',
        'link_vidio',
        'created_at',
      ],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<AchievementEntity | any> {
    const resFindSeller = await this.achievementRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(
    body: AchievementEntity | any,
  ): Promise<AchievementEntity> {
    await this.achievementRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(
    body: AchievementEntity | any,
  ): Promise<AchievementEntity> {
    const resAchievement = await this.achievementRepository.create(body);
    if (body?.id_student) {
      const getStudent = await this.studentRepository.findOne({
        where: {
          id: body?.id_student,
        },
        attributes: ['id', 'full_name', 'email_user'],
      });
      const { email_user } = getStudent?.dataValues || {};
      const getUser = await this.userRepository.findOne({
        where: {
          email: email_user,
        },
        attributes: ['id'],
      });
      if (email_user && getUser?.dataValues?.id) {
        this.notificationService.createNotifOneService({
          title: 'Selamat kamu dapat sertifikat, Yuk check lewat aplikasi',
          id_user: getUser?.dataValues?.id,
          type: 'sertifikat',
          description: body?.name,
          id_sertifikat: resAchievement.id,
        });
      }
    }
    return resAchievement;
  }

  async sertifikat(id: string): Promise<any> {
    const getDetail = await this.achievementRepository.findOne({
      where: {
        uuid: id,
      },
      attributes: ['uuid'],
      include: [
        {
          model: StudentEntity,
          as: 'student',
          attributes: ['id', 'full_name'],
          required: true,
        },
        {
          model: LevelTahfidzEntity,
          as: 'levelTahfidz',
          attributes: ['id', 'sertifikat_url'],
          required: true,
        },
      ],
    });
    if (!getDetail?.student) {
      throw new BadRequestException('not found');
    }
    const url_image = getDetail.levelTahfidz.sertifikat_url;
    const fileExt: any = url_image.split('.').pop();
    // const resDownload = await downloadSertifikat(
    //   getDetail.student.full_name,
    //   url_image,
    //   fileExt,
    // );
    return {
      buffer: "resDownload.toBuffer()",
      type: "fileExt",
    };
  }
}
