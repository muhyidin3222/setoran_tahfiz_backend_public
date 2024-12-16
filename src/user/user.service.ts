import { Inject, Injectable } from '@nestjs/common';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserClassEntity } from 'src/class/user_class.entity';
import {
  admin_user_provider,
  student_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { StudentEntity } from 'src/student/student.entity';
import { AdminUserEntity } from './admin-user.entity';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    @Inject(admin_user_provider.provide)
    private adminRepository: typeof AdminUserEntity,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
  ) {}

  async detailService(param: any): Promise<UserEntity> {
    const resEntity = await this.userRepository.findOne(param);
    return resEntity;
  }

  async getService(query): Promise<{ rows: UserEntity[]; count: number }> {
    const resEntity = await this.userRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'name', 'email', 'phone', 'photo', 'type_user'],
      order: [['created_at', 'DESC']],
    });
    return resEntity;
  }

  async getFindAll(query): Promise<UserEntity[]> {
    const resEntity = await this.userRepository.findAll({
      ...query,
      attributes: ['id', 'name', 'email', 'phone', 'photo'],
      order: [['created_at', 'DESC']],
    });
    return resEntity;
  }

  async deleteService(id: number): Promise<UserEntity | any> {
    const resEntity = await this.userRepository.destroy({
      where: {
        id,
      },
    });
    return resEntity;
  }

  async updateService(body: UserEntity | any): Promise<UserEntity> {
    await this.userRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: UserEntity | any): Promise<UserEntity> {
    const resEntity = await this.userRepository.create(body);
    return resEntity;
  }

  async detailAdminService(param: any): Promise<AdminUserEntity> {
    const resEntity = await this.adminRepository.findOne(param);
    return resEntity;
  }

  async checkStatusLogin(email: string): Promise<any> {
    let step_register = null;
    const checkStudnet = await this.studentRepository.findOne({
      where: {
        email_user: email,
      },
      attributes: ['id', 'full_name', 'photo', 'id_school', 'id_user'],
      include: [
        {
          model: UserClassEntity,
          required: false,
          include: [
            {
              model: MasterClassEntity,
              attributes: ['name'],
              required: false,
            },
          ],
        },
      ],
    });
    const userClass = {
      id_student: checkStudnet?.dataValues?.id,
      id_school: checkStudnet?.dataValues?.id_school,
      student: checkStudnet?.dataValues?.full_name,
      photo: checkStudnet?.dataValues?.photo,
      user_class: checkStudnet?.dataValues?.userClass?.masterClass?.name,
      id_class: checkStudnet?.dataValues?.userClass?.masterClass?.id,
    };
    const student = {
      id: checkStudnet?.dataValues?.id,
      full_name: checkStudnet?.dataValues?.full_name,
      photo: checkStudnet?.dataValues?.photo,
    };
    if (!checkStudnet) {
      step_register = 1;
    } else {
      if (!checkStudnet?.dataValues?.id_user) {
        await this.studentRepository.update(
          {
            id_user: checkStudnet?.dataValues?.id_user,
          },
          {
            where: {
              email_user: email,
            },
          },
        );
      }
    }
    return {
      step_register,
      userClass,
      student,
    };
  }
}
