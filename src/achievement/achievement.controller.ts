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
  Response,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamCreate, ParamGet, ParamUpdate } from './achievement.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { dataConstants } from 'src/auth/auth.constants';
import { Roles } from 'src/auth/roles.decorator';
import { user_provider } from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';
import { Response as Res } from 'express';

@Controller('achievement')
export class AchievementController {
  constructor(
    private achievementService: AchievementService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  @Get('/user/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async get(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user?.id,
      },
      attributes: ['id_school'],
    });
    const where: any = {
      id_school: getUser?.dataValues?.id_school,
      id_student: query?.id_student,
    };
    let paginationSet = {};
    if (query?.page) {
      paginationSet = pagination(query);
    }
    const responseData = await this.achievementService.getService({
      ...paginationSet,
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
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async getAdmin(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const where: any = {
      id_school: user?.id,
      id_student: query?.id_student,
    };
    let paginationSet = {};
    if (query?.page) {
      paginationSet = pagination(query);
    }
    const responseData = await this.achievementService.getService({
      ...paginationSet,
      where,
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
    const responseData = await this.achievementService.createService({
      ...body,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/user/detail/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async detail(@Query() query: ParamGet, @Param() param) {
    const { id_student } = query;
    const id = param?.id;
    const responseData = await this.achievementService.detailService({
      where: { id_student: id_student, id: id },
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/update')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async update(@Body() body: ParamUpdate) {
    const responseData = await this.achievementService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @Delete('/delete/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.achievementService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/sertifikat/:id')
  async getSertifikat(@Param('id') id?: string, @Response() res?: Res) {
    const responseData = await this.achievementService.sertifikat(id);
    res.writeHead(200, { 'content-type': `image/${responseData.type}` });
    res.write(responseData.buffer);
    res.end();
  }
}
