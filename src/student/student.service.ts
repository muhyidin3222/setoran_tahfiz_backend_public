import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserClassEntity } from 'src/class/user_class.entity';
import {
  master_class_provider,
  student_provider,
  user_class_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { NotificationService } from 'src/notification/notification.service';
import { UserEntity } from 'src/user/user.entity';
import { ParamCreate, ParamUpdate } from './student.dto';
import { StudentEntity } from './student.entity';
import { spreadsheetsConfig } from 'src/common/library/spreadsheetsConnect';
import { Op } from 'sequelize';
import moment from 'moment';

@Injectable()
export class StudentService {
  constructor(
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    @Inject(user_class_provider.provide)
    private userClassRepository: typeof UserClassEntity,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    private readonly notificationService: NotificationService,
    @Inject(master_class_provider.provide)
    private masterClassRepository: typeof MasterClassEntity,
  ) {}

  async detailService(param: any): Promise<StudentEntity> {
    const resFindStudent = await this.studentRepository.findOne(param);
    return resFindStudent;
  }

  async getService(
    query: any,
  ): Promise<{ rows: StudentEntity[]; count: number }> {
    const resFindStudent = await this.studentRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'full_name', 'photo'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: UserClassEntity,
          attributes: ['id'],
          as: 'userClass',
          include: {
            model: MasterClassEntity,
            attributes: ['name'],
            as: 'masterClass',
          },
        },
        {
          model: UserClassEntity,
          attributes: ['id'],
          as: 'userClass',
        },
      ],
    });
    const mapingData: any = await Promise.all(
      resFindStudent?.rows?.map(async (value) => {
        return {
          id: value?.id,
          full_name: value?.full_name,
          photo: value?.photo,
          userClass: {
            id: value?.userClass?.id,
            name: value?.userClass?.masterClass?.dataValues?.name,
          },
        };
      }),
    );
    return {
      rows: mapingData,
      count: resFindStudent.count,
    };
  }

  async getServiceAdmin(
    query: any,
  ): Promise<{ rows: StudentEntity[]; count: number }> {
    const resFindStudent = await this.studentRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'full_name', 'photo', 'no', 'email_user'],
      order: [['created_at', 'DESC']],
    });
    return resFindStudent;
  }

  async deleteService(id: number): Promise<StudentEntity | any> {
    await this.studentRepository.update(
      { id_user_class: null },
      {
        where: {
          id,
        },
      },
    );
    await this.userClassRepository.destroy({
      where: {
        id_student: id,
      },
    });
    const resFindStudent = await this.studentRepository.destroy({
      where: {
        id,
      },
      force: true,
    });
    return resFindStudent;
  }

  async updateService(body: ParamUpdate | any): Promise<StudentEntity> {
    await this.studentRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async updateEmailUser(body: any): Promise<StudentEntity> {
    const updateData = body;
    const userRes: any = await this.userRepository.findOne({
      where: {
        email: body?.email_user,
      },
      attributes: ['id', 'fcm_token'],
    });
    const checkStudnetUser = await this.studentRepository.findOne({
      where: {
        email_user: body?.email_user,
      },
      attributes: ['id', 'full_name'],
    });
    if (checkStudnetUser?.dataValues?.id) {
      throw new BadRequestException(
        `${body?.email_user} sudah dipakai, check murid ${checkStudnetUser?.dataValues?.full_name}`,
      );
    }
    if (userRes?.dataValues?.id) {
      await this.userRepository.update(
        {
          id_school: body?.id_school,
          step_register: null,
        },
        {
          where: {
            id: userRes?.dataValues?.id,
          },
        },
      );
    }
    /// check and send notif
    if (userRes?.dataValues?.id) {
      updateData.id_user = userRes?.dataValues?.id;
      await this.notificationService.createNotifOneService({
        title: 'Kamu Sekarang Bisa Akses App',
        description: 'Yuk, check setiap setoran anak ',
        id_user: userRes?.dataValues?.id,
        type: 'acess_app',
      });
    }
    return updateData;
  }

  async updateServiceAdmin(body: ParamUpdate | any): Promise<StudentEntity> {
    let updateData = body;
    let resUserClass: any;
    if (body?.email_user) {
      updateData = await this.updateEmailUser(body);
    }
    if (body?.id_master_class) {
      resUserClass = await this.userClassRepository.create({
        id_master_class: body?.id_master_class,
        id_student: body?.id,
      });
      updateData.id_user_class = resUserClass?.id;
    }
    await this.studentRepository.update(updateData, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: ParamCreate | any): Promise<StudentEntity> {
    const createData = body;
    const dataCreated = await this.studentRepository.create(createData);
    const resCreated = dataCreated?.dataValues;
    if (body?.email_user) {
      await this.updateEmailUser(resCreated);
    }
    const resUserClass = await this.userClassRepository.create({
      id_student: resCreated.id,
      id_master_class: createData.id_master_class,
    });
    await this.studentRepository.update(
      {
        id_user_class: resUserClass?.id,
      },
      {
        where: {
          id: resCreated?.id,
        },
      },
    );
    if (createData.id_user) {
      await this.userRepository.update(
        {
          id_student: resCreated?.id,
        },
        {
          where: {
            id: createData.id_user,
          },
        },
      );
    }
    return resCreated;
  }

  async createServiceArray(
    body: StudentEntity | any,
  ): Promise<StudentEntity[]> {
    const resData = await Promise.all(
      body?.map(async (val) => {
        const { masterClass, full_name, no, email_user, gender, id_school } =
          val;
        const where = {
          full_name,
          no,
          id_school,
        };
        const findOrCreateStudent: any =
          await this.studentRepository.findOrCreate({
            where: where,
            defaults: {
              ...where,
              email_user,
              gender,
            },
          });
        const whereUserClass = {
          id_student: findOrCreateStudent[0]?.dataValues?.id,
          id_master_class: masterClass?.id,
        };
        const dataUserClass: any = await this.userClassRepository.findOrCreate({
          where: whereUserClass,
          defaults: whereUserClass,
        });
        await this.studentRepository.update(
          {
            id_user_class: dataUserClass[0]?.dataValues?.id,
          },
          {
            where: {
              id: findOrCreateStudent[0]?.dataValues?.id,
            },
          },
        );
      }),
    );
    return resData;
  }

  async getSpreadsheet(): Promise<any> {
    const resData = await spreadsheetsConfig();
    await Promise.all(
      resData?.map(async (val, index) => {
        if (index) {
          const [studentCreated, studnetCheck] =
            await this.studentRepository.findOrCreate({
              where: {
                id_school: 1,
                [Op.or]: val[3]?.trim()
                  ? [
                      {
                        email_user: val[3]?.trim(),
                      },
                      {
                        full_name: val[1]?.trim(),
                      },
                    ]
                  : [
                      {
                        full_name: val[1]?.trim(),
                      },
                    ],
              },
              defaults: {
                no: val[0]?.trim(),
                full_name: val[1]?.trim(),
                email_user: val[3]?.trim() || null,
                parent: val[4]?.trim() || null,
              },
            });
          if (studnetCheck) {
            const [masterClass] = await this.masterClassRepository.findOrCreate(
              {
                where: {
                  name: val[2]?.trim(),
                },
                defaults: {
                  name: val[2]?.trim(),
                  total_student: 30,
                  school_year_start: moment().format('YYYY-MM'),
                  school_year_end: moment().add(1, 'years').format('YYYY-MM'),
                  id_school: 1,
                },
              },
            );
            const [userClass, userClassCheck] =
              await this.userClassRepository.findOrCreate({
                where: {
                  id_master_class: masterClass?.dataValues?.id,
                  id_student: studentCreated?.dataValues?.id,
                },
                defaults: {
                  id_master_class: masterClass?.dataValues?.id,
                  id_student: studentCreated?.dataValues?.id,
                },
              });
            if (userClassCheck) {
              await this.studentRepository.update(
                {
                  id_user_class: userClass?.dataValues?.id,
                },
                {
                  where: {
                    id: studentCreated?.dataValues?.id,
                  },
                },
              );
            }
          }
        }
      }),
    );
    return resData;
  }
}
