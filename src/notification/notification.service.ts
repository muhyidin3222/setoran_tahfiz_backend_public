import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { firebaseInit } from 'src/common/library/firebase';
import {
  notification_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(notification_provider.provide)
    private notificationRepository: typeof NotificationEntity,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  async detailService(param: any): Promise<NotificationEntity> {
    const resFindSeller = await this.notificationRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query,
  ): Promise<{ rows: NotificationEntity[]; count: number }> {
    const resFindSeller = await this.notificationRepository.findAndCountAll({
      ...query,
      attributes: [
        'id',
        'name',
        'id_setoran',
        'id_berita',
        'id_sertifikat',
        'screen',
        'description',
        'created_at',
      ],
      order: [['created_at', 'DESC']],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<NotificationEntity | any> {
    const resFindSeller = await this.notificationRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(
    body: NotificationEntity | any,
  ): Promise<NotificationEntity> {
    await this.notificationRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: NotificationEntity | any): Promise<any> {
    const resFindSeller = await this.notificationRepository.create(body);
    return resFindSeller;
  }

  async createAllNotifService(body: any): Promise<any> {
    const getUser: any = await this.userRepository.findAll({
      where: {
        id_school: body?.id_school,
        token: {
          [Op.not]: null,
        },
        fcm_token: {
          [Op.not]: null,
        },
      },
      attributes: ['id'],
      order: [['created_at', 'DESC']],
    });
    const notifTitleData =
      body?.type === 'EVENT' ? 'Kabar Event' : 'Info Terbaru Dari Sekolah';
    const message = {
      data: {
        type: body?.type,
        id: body?.id?.toString() || '',
      },
      notification: {
        title: notifTitleData,
        body: body?.title,
      },
    };
    const dataCreated = getUser.map((value) => {
      return {
        name: notifTitleData,
        description: body?.title,
        type: body?.type,
        id_user: value?.dataValues?.id,
      };
    });
    await this.notificationRepository.bulkCreate(dataCreated, {
      individualHooks: true,
    });
    // await firebaseInit
    //   .messaging()
    //   .sendToTopic(`${body?.type}${body?.id_school}`, message)
    //   .then((response) =>
    //     console.log(
    //       JSON.stringify(response) + ' messages were sent successfully',
    //     ),
    //   )
    //   .catch((error) => {
    //     console.log(error);
    //   });
    return;
  }

  async createNotifOneService(body: any): Promise<any> {
    try {
      const {
        title,
        id_user,
        type,
        description,
        id_berita,
        id_setoran,
        id_sertifikat,
      } = body;
      const getUser: any = await this.userRepository.findOne({
        where: {
          id: id_user,
        },
        attributes: ['id', 'fcm_token'],
        order: [['created_at', 'DESC']],
      });
      const message = {
        data: {
          type: type,
          id: id_user?.toString() || '',
        },
        notification: {
          title: title,
          body: description,
        },
        token: getUser?.fcm_token,
      };
      if (getUser?.fcm_token?.length) {
        const resNotification = await this.notificationRepository.create({
          name: title,
          description: description,
          type: type,
          id_user: id_user,
          id_berita,
          id_setoran,
          id_sertifikat,
        });
        // await firebaseInit
        //   .messaging()
        //   .send(message)
        //   .then((response) =>
        //     console.log(
        //       JSON.stringify(response) + ' messages were sent successfully',
        //     ),
        //   );
        return resNotification;
      }
      return;
    } catch (error) {
      console.log('error', error);
    }
  }
}
