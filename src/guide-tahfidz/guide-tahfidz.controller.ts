import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Inject,
  BadGatewayException,
} from '@nestjs/common';
import { GuideTahfidzService } from './guide-tahfidz.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import {
  ParamArrayCreate,
  ParamCreate,
  ParamGet,
  ParamUpdate,
} from './guide-tahfidz.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { dataConstants } from 'src/auth/auth.constants';
import { Roles } from 'src/auth/roles.decorator';
import {
  level_tahfidz_provider,
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { UserEntity } from 'src/user/user.entity';
import { Op } from 'sequelize';
import { StudentEntity } from 'src/student/student.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { GuideTahfidzEntity } from './guide-tahfidz.entity';

@Controller('guide-tahfidz')
export class GuideTahfidzController {
  constructor(
    private guideTahfidzService: GuideTahfidzService,
    @Inject(user_setoran_provider.provide)
    private userSetoranRepository: typeof UserSetoranEntity,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    @Inject(level_tahfidz_provider.provide)
    private levelTahfidzRepository: typeof LevelTahfidzEntity,
  ) {}

  @Get('/admin/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.admin, dataConstants.master_admin)
  async get(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    let paginationSet = {};
    let where: any = {
      id_school: user?.id,
    };
    if (query?.page) {
      paginationSet = pagination(query);
    }
    if (query?.search?.length) {
      if (query?.type_search === 'no') {
        where = {
          ...where,
          no: {
            [Op.like]: `%${query?.search}%`,
          },
        };
      }
      if (query?.type_search === 'name') {
        where = {
          ...where,
          name: {
            [Op.like]: `%${query?.search}%`,
          },
        };
      }
    }
    if (query?.level_tahfidz) {
      where.id_level_tahfidz = query?.level_tahfidz;
    }
    const responseData = await this.guideTahfidzService.getService({
      ...paginationSet,
      where: where,
      include: [
        {
          model: LevelTahfidzEntity,
          as: 'levelTahfidz',
          attributes: ['id', 'name'],
          required: true,
        },
      ],
      order: [['no', 'DESC']],
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/user/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async getUser(@Query() query: ParamGet, @Req() request) {
    let paginationSet = {};
    const where: any = {};
    const { user } = request;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      attributes: ['id_school', 'type_user'],
    });
    where.id_school = getUser?.dataValues?.id_school;
    if (query?.page) {
      paginationSet = pagination(query);
    }
    if (query?.search) {
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${query?.search}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${query?.search}%`,
          },
        },
      ];
    }
    if (query?.level_tahfidz) {
      where.id_level_tahfidz = query.level_tahfidz;
    }
    const responseData = await this.guideTahfidzService.getService({
      ...paginationSet,
      where: where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/user/last')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async getUserLast(@Query() query: any) {
    const getUser = await this.studentRepository.findOne({
      where: {
        id: query.id_student,
      },
      attributes: ['id_school'],
    });
    const lastSetoran = await this.userSetoranRepository.findOne({
      where: {
        id_student: query.id_student,
      },
      attributes: ['id_guide_tahfidz'],
      order: [['created_at', 'DESC']],
      include: {
        model: GuideTahfidzEntity,
        as: 'guideTahfidz',
        attributes: ['id_level_tahfidz', 'no'],
        required: true,
        order: [['no', 'ASC']],
      },
    });
    const no_guide_tahfidz = lastSetoran?.dataValues?.guideTahfidz?.no;
    const id_level_tahfidz =
      lastSetoran?.dataValues?.guideTahfidz?.id_level_tahfidz;

    let whereAnd: any;
    if (getUser?.dataValues?.id_school) {
      whereAnd = {
        id_school: getUser?.dataValues?.id_school,
      };
    } else {
      return responeSuccess({
        data: [],
      });
    }
    if (id_level_tahfidz) {
      whereAnd.id_level_tahfidz = id_level_tahfidz;
    }
    const responseData = await this.guideTahfidzService.getServiceLastTahfidz({
      where: {
        [Op.and]: [
          whereAnd,
          {
            no: {
              [Op.gte]: no_guide_tahfidz || 1,
            },
          },
        ],
      },
      limit: 4,
    });
    return responeSuccess({
      data: no_guide_tahfidz ? responseData : [{}, ...responseData],
    });
  }

  @Post('/create')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async create(@Body() body: ParamCreate, @Req() request) {
    const { user } = request;
    const responseData = await this.guideTahfidzService.createService({
      ...body,
      id_school: user.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/create-array')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async createArray(@Body() body: Array<ParamArrayCreate>, @Req() request) {
    const { user } = request;
    const getLevelTahfidz: any = await this.levelTahfidzRepository.findAll({
      where: {
        id_school: user.id,
      },
      attributes: ['id', 'name'],
    });
    const mapingData = await Promise.all(
      body.map((value) => {
        if (!value?.level_tahfidz) {
          throw new BadGatewayException(`level tahfidz wajib di isi`);
        }
        if (!value?.name) {
          throw new BadGatewayException(`name wajib di isi`);
        }
        if (!value?.no) {
          throw new BadGatewayException(`no wajib di isi`);
        }
        const id_level_tahfidz = getLevelTahfidz?.find((val) => {
          return val?.dataValues?.name === value?.level_tahfidz;
        });
        if (!id_level_tahfidz) {
          throw new BadGatewayException(
            `not found level tahfidz ${value?.level_tahfidz}`,
          );
        }
        return {
          name: value?.name,
          no: value?.no,
          id_level_tahfidz: id_level_tahfidz?.dataValues?.id,
          id_school: user.id,
        };
      }),
    );
    const responseData = await this.guideTahfidzService.createServiceArray(
      mapingData,
    );
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/update')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async update(@Body() body: ParamUpdate) {
    const responseData = await this.guideTahfidzService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @Delete('/delete/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.guideTahfidzService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }
}
