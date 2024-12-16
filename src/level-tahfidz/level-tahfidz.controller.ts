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
} from '@nestjs/common';
import { LevelTahfidzService } from './level-tahfidz.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamCreate, ParamGet } from './level-tahfidz.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { dataConstants } from 'src/auth/auth.constants';
import { Roles } from 'src/auth/roles.decorator';
import { user_provider } from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';
import { Op } from 'sequelize';

@Controller('level-tahfidz')
export class LevelTahfidzController {
  constructor(
    private levelTahfidzService: LevelTahfidzService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  @Get('/user/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async get(@Query() query: ParamGet, @Req() request) {
    const userGet = await this.userRepository.findOne({
      where: {
        id: request.user.id,
      },
      attributes: ['id_school'],
    });

    let where: any = {
      id_school: userGet.id_school,
    };

    if (query?.search?.length) {
      where = {
        ...where,
        name: {
          [Op.like]: `%${query?.search}%`,
        },
      };
    }

    const responseData = await this.levelTahfidzService.getService({
      ...pagination(query),
      where: where,
    });

    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/admin/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async getAdmin(@Query() query: ParamGet, @Req() request) {
    let paginationSet = {};
    const where: any = {
      id_school: request.user.id,
    };
    if (query?.page) {
      paginationSet = pagination(query);
    }
    if (query.id_student) {
      where.id_student = query.id_student;
    }
    const responseData = await this.levelTahfidzService.getService({
      ...paginationSet,
      where: where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Post('/create')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async create(@Body() body: ParamCreate, @Req() request) {
    const { user } = request;
    const responseData = await this.levelTahfidzService.createService({
      ...body,
      id_school: user.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/update')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async update(@Body() body: ParamCreate, @Req() request) {
    const { user } = request;
    const responseData = await this.levelTahfidzService.updateService({
      ...body,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Delete('/delete/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async delete(@Param('id', new ParseIntPipe()) id: number, @Req() request) {
    const { user } = request;
    const responseData = await this.levelTahfidzService.deleteService({
      id,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
