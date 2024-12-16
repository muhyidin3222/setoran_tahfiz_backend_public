import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  Inject,
} from '@nestjs/common';
import { StudentService } from './student.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import {
  ParamArrayCreate,
  ParamCreate,
  ParamGet,
  ParamUpdate,
} from './student.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { dataConstants } from 'src/auth/auth.constants';
import { Throttle } from '@nestjs/throttler';
import {
  achievement_provider,
  master_class_provider,
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';
import { Op } from 'sequelize';
import { UserClassEntity } from 'src/class/user_class.entity';
import { MasterClassEntity } from 'src/class/master_class.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { StudentEntity } from './student.entity';
import { AchievementEntity } from 'src/achievement/achievement.entity';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    @Inject(user_setoran_provider.provide)
    private userSetoranRepository: typeof UserSetoranEntity,
    @Inject(master_class_provider.provide)
    private masterClassRepository: typeof MasterClassEntity,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    @Inject(achievement_provider.provide)
    private achievementRepository: typeof AchievementEntity,
  ) {}

  @Get('/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin, dataConstants.user)
  async get(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const where: any = {
      id_school: user?.id,
    };
    if (query?.id_user_class) {
      where.id_user_class = query?.id_user_class;
    }
    const responseData = await this.studentService.getService({
      ...pagination(query),
      where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/admin/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.admin, dataConstants.master_admin)
  async getAdmin(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    let where: any = {
      id_school: user?.id,
    };
    let whereMasterClass: any = {};
    if (query?.search) {
      where = {
        ...where,
        [Op.or]: [
          {
            full_name: {
              [Op.like]: `%${query.search}%`,
            },
          },
          {
            email_user: {
              [Op.like]: `${query.search}%`,
            },
          },
        ],
      };
    }
    if (query?.id_master_class) {
      whereMasterClass = {
        id: query?.id_master_class,
      };
    }
    const responseData = await this.studentService.getServiceAdmin({
      ...pagination(query),
      where,
      include: [
        {
          model: UserClassEntity,
          attributes: ['id'],
          as: 'userClass',
          required: query?.id_master_class ? true : false,
          include: {
            model: MasterClassEntity,
            attributes: ['name'],
            as: 'masterClass',
            required: query?.id_master_class ? true : false,
            where: whereMasterClass,
          },
        },
      ],
    });

    const dataResponse = await Promise.all(
      responseData.rows.map(async (value) => {
        const countSetoranMurid = await this.userSetoranRepository.count({
          where: {
            id_student: value.dataValues.id,
          },
        });
        const countSertifikat = await this.achievementRepository.count({
          where: {
            id_student: value.dataValues.id,
          },
        });
        return {
          ...value.dataValues,
          countSetoranMurid,
          countSertifikat,
        };
      }),
    );

    return responeSuccess({
      total: responseData.count,
      data: dataResponse,
    });
  }

  @Post('/create-array')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async createArray(@Body() body: Array<ParamArrayCreate>, @Req() request) {
    const { user } = request;
    const getMasterClass: any = await this.masterClassRepository.findAll({
      where: {
        id_school: user.id,
      },
      attributes: ['id', 'name'],
    });
    const mapingData = await Promise.all(
      body.map((value) => {
        const masterClass = getMasterClass?.find((val) => {
          return val?.dataValues?.name === value?.master_class;
        });
        return {
          masterClass,
          full_name: value?.full_name,
          no: value?.no,
          email_user: value?.email_user,
          id_school: user.id,
          gender: value?.gender,
        };
      }),
    );
    const responseData = await this.studentService.createServiceArray(
      mapingData,
    );
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/ustadz/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async getUser(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const { search } = query;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user?.id,
      },
      attributes: ['id_school'],
    });
    const where: any = {
      id_school: getUser?.dataValues?.id_school,
    };
    if (search) {
      where.full_name = {
        [Op.like]: `%${search}%`,
      };
    }
    const responseData = await this.studentService.getService({
      ...pagination(query),
      where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Throttle(5, 10)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/create')
  async create(@Body() body: ParamCreate, @Req() request) {
    const { user } = request;
    const responseData = await this.studentService.createService({
      ...body,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/admin/update')
  async update(@Body() body: ParamUpdate, @Req() request) {
    const { user } = request;
    const responseData = await this.studentService.updateServiceAdmin({
      ...body,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Get('/admin/spreadsheet')
  async getStudentSpreadsheet() {
    const res = await this.studentService.getSpreadsheet();
    return responeSuccess({
      data: res,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  @Post('/user/update')
  async updateUser(@Body() body: ParamUpdate, @Req() request) {
    const { user } = request;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      attributes: ['id', 'email'],
    });
    const getIdStudent = await this.studentRepository.findOne({
      where: {
        email_user: getUser.dataValues?.email,
      },
      attributes: ['id'],
    });
    const responseData = await this.studentService.updateServiceAdmin({
      ...body,
      id: getIdStudent.dataValues?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.studentService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  @Get('/user/detail/:id')
  async detail(@Param() param: any, @Req() request) {
    const { user } = request;
    const responseData = await this.studentService.detailService({
      where: {
        id: param.id,
      },
      attributes: ['id', 'full_name', 'no', 'date_of_birth', 'photo'],
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
              include: {
                model: UserEntity,
                attributes: ['name'],
                as: 'waliKelas',
              },
            },
          ],
        },
      ],
    });
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
    const { date_of_birth, full_name, userClass, no, photo } =
      responseData?.dataValues || {};

    return responeSuccess({
      data: {
        full_name: full_name,
        no,
        photo,
        date_of_birth,
        classStudent: {
          name: userClass?.masterClass?.name,
          id: userClass?.masterClass?.id,
          waliKelas: userClass?.masterClass?.waliKelas?.name,
        },
        levelTahfidz: lastSetoran?.dataValues?.guideTahfidz?.levelTahfidz,
      },
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.admin, dataConstants.master_admin)
  @Get('/admin/detail/:id')
  async detailAdmin(@Param() param: any) {
    const responseData: any = await this.studentService.detailService({
      where: {
        id: param.id,
      },
      attributes: [
        'id',
        'full_name',
        'photo',
        'no',
        'date_of_birth',
        'gender',
        'email_user',
        'id_school',
        'id_user',
        'id_user_class',
      ],
      include: [
        {
          model: UserClassEntity,
          attributes: ['id_master_class'],
          as: 'userClass',
        },
      ],
    });

    return responeSuccess({
      data: {
        ...responseData?.dataValues,
        id_master_class:
          responseData?.dataValues?.userClass?.dataValues?.id_master_class,
      },
    });
  }
}
