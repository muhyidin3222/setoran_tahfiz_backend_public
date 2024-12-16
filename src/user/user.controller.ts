import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import {
  ParamCreate,
  ParamGet,
  ParamUpdate,
  ParamUpdateAdmin,
} from 'src/user/user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { dataConstants } from 'src/auth/auth.constants';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SchoolEntity } from 'src/school/school.entity';
import {
  student_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { StudentEntity } from '../student/student.entity';
import { UserClassEntity } from 'src/class/user_class.entity';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { Op } from 'sequelize';
import { UserEntity } from './user.entity';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    @Inject(user_setoran_provider.provide)
    private userSetoranRepository: typeof UserSetoranEntity,
  ) {}

  @Get('/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async get(@Query() query: ParamGet, @Req() request) {
    const { type_user } = query || {};
    const { user } = request;
    let where: any = {
      id_school: user?.id,
    };
    if (type_user) {
      where.type_user = type_user;
    }
    if (query?.search) {
      where = {
        ...where,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query.search}%`,
            },
          },
          {
            email: {
              [Op.like]: `${query.search}%`,
            },
          },
        ],
      };
    }
    const responseData = await this.userService.getService({
      where: where,
      ...pagination(query),
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/admin/search')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async getSearch(@Query() query: ParamGet) {
    const where: any = {
      id_school: null,
    };
    if (query?.search) {
      where.email = {
        [Op.like]: `%${query.search}`,
      };
    }
    if (query?.type_user) {
      where.type_user = {
        [Op.like]: `%${query.type_user}`,
      };
    }
    const responseData = await this.userService.getFindAll({
      where,
      ...pagination(query),
      attributes: ['id', 'email', 'name', 'id_school'],
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/detail/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.user, dataConstants.admin)
  async detail(@Param() param: any, @Req() request) {
    const { user } = request;
    const responseData = await this.userService.detailService({
      where: {
        id: param.id,
      },
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'photo',
        'gender',
        'date_of_birth',
        'about',
        'id_school',
        'id_student',
        'created_at',
        'type_user',
        'version',
      ],
    });
    if (responseData?.dataValues?.type_user === 'user') {
      if (user?.id === Number(param?.id)) {
        const checkStatusLogin = await this.userService.checkStatusLogin(
          responseData?.dataValues?.email,
        );
        return responeSuccess({
          data: {
            ...responseData.dataValues,
            ...checkStatusLogin,
          },
        });
      } else {
        throw new BadGatewayException('Not Have Access');
      }
    } else {
      const adminResponse = await this.userService.detailService({
        where: {
          id: param.id,
        },
      });
      return responeSuccess({
        data: adminResponse,
      });
    }
  }

  @Get('/admin/detail/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.user, dataConstants.admin)
  async detailUserAdmin(@Param() param: any) {
    // const { user } = request;
    const responseData = await this.userService.detailService({
      where: {
        id: param.id,
        // id_school: user?.id,
      },
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'photo',
        'id_school',
        'created_at',
        'type_user',
        'step_register',
      ],
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/self')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async self(@Req() request) {
    const { user } = request;
    let student = {};
    let schoolClass = {};
    const responseData = await this.userService.detailService({
      where: {
        id: user.id,
      },
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'photo',
        'gender',
        'date_of_birth',
        'about',
        'id_school',
        'id_student',
        'location',
        'type_user',
      ],
    });
    if (responseData?.type_user === 'user') {
      const getStudent = await this.studentRepository.findOne({
        where: {
          email_user: responseData?.email,
        },
        attributes: [
          'id',
          'full_name',
          'no',
          'date_of_birth',
          'photo',
          'gender',
          'parent',
        ],
        include: [
          {
            model: UserClassEntity,
            attributes: ['id'],
            as: 'userClass',
            include: [
              {
                model: MasterClassEntity,
                attributes: ['name'],
                as: 'masterClass',
                include: [
                  {
                    model: UserEntity,
                    attributes: ['name'],
                    as: 'waliKelas',
                  },
                ],
              },
            ],
          },
          {
            model: SchoolEntity,
            attributes: ['name'],
            as: 'schoolClass',
          },
        ],
      });
      const { date_of_birth, full_name, userClass, no, gender, photo, parent } =
        getStudent?.dataValues || {};
      student = {
        id: getStudent?.dataValues?.id,
        full_name: full_name,
        parent,
        no,
        gender,
        photo,
        date_of_birth,
        classStudent: {
          name: userClass?.masterClass?.name,
          id: userClass?.masterClass?.id,
          waliKelas: userClass?.masterClass?.waliKelas?.name,
        },
      };

      schoolClass = getStudent?.dataValues?.schoolClass;
      const lastSetoran = await this.userSetoranRepository.findOne({
        where: {
          id_user: user?.id,
        },
        include: [
          {
            model: GuideTahfidzEntity,
            as: 'guideTahfidz',
            attributes: ['id'],
            required: true,
            include: [
              {
                model: LevelTahfidzEntity,
                as: 'levelTahfidz',
                attributes: ['id', 'name'],
                required: true,
              },
            ],
          },
        ],
        attributes: ['id', 'id_student'],
        order: [['created_at', 'DESC']],
      });
      return responeSuccess({
        data: {
          ...responseData.dataValues,
          student,
          levelTahfidz: lastSetoran?.dataValues?.guideTahfidz?.levelTahfidz,
          school: schoolClass,
        },
      });
    } else {
      return responeSuccess({
        data: responseData,
      });
    }
  }

  @Post('/create')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async create(@Body() body: ParamCreate) {
    const responseData = await this.userService.createService({
      ...body,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/update/self')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async updateSelf(@Body() body: ParamUpdate, @Req() request) {
    const { user } = request;
    if (user?.id !== body?.id) {
      throw new BadRequestException('Not Have Access');
    }
    const responseData = await this.userService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/admin/update')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.admin, dataConstants.master_admin)
  async updateAdmin(@Body() body: ParamUpdateAdmin) {
    const responseData = await this.userService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @Delete('/delete/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.userService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/admin/self')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async detailAdmin(@Req() request) {
    const { user } = request;
    const responseData = await this.userService.detailAdminService({
      where: {
        id: user.id,
      },
      attributes: ['id', 'email', 'id_school', 'created_at'],
      include: [
        {
          model: SchoolEntity,
          attributes: ['name', 'photo', 'total_student', 'description'],
        },
      ],
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
