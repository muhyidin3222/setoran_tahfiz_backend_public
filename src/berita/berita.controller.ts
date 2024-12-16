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
  CacheKey,
  CacheTTL,
  Inject,
} from '@nestjs/common';
import { BeritaService } from './berita.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamCreate, ParamGet, ParamUpdate } from './berita.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { dataConstants } from 'src/auth/auth.constants';
import { Throttle } from '@nestjs/throttler';
import { user_provider } from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';
import { TagEntity } from 'src/tag/tag.entity';

@Controller('berita')
export class BeritaController {
  constructor(
    private beritaService: BeritaService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  @CacheKey('berita_get')
  @CacheTTL(30)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  @Get('/user/get')
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
    };
    if (query?.id_tag) {
      where.id_tag = query?.id_tag;
    }
    if (query?.type === 'top') {
      where.top = 1;
    }
    const responseData = await this.beritaService.getService({
      ...pagination(query),
      where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @CacheKey('berita_get')
  @CacheTTL(30)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Get('/admin/get')
  async getAdmin(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const where: any = {
      id_school: user?.id,
    };
    const responseData = await this.beritaService.getService({
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
  @Post('/admin/create')
  async create(@Body() body: ParamCreate, @Req() request) {
    const { user } = request;
    const id_school = user?.id;
    const responseData = await this.beritaService.createService({
      ...body,
      id_school,
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
    const id_school = user?.id;
    const responseData = await this.beritaService.updateAdminService(body, {
      id: body?.id,
      id_school,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/admin/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number, @Req() request) {
    const { user } = request;
    const id_school = user?.id;
    const responseData = await this.beritaService.deleteService({
      id,
      id_school,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/admin/detail/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.admin, dataConstants.master_admin)
  async detailAdmin(@Param() param: any) {
    const responseData = await this.beritaService.detailService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/user/detail/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async detail(@Param() param: any) {
    const responseData = await this.beritaService.detailService({
      where: {
        id: param.id,
      },
      include: [
        {
          model: TagEntity,
          as: 'tag',
          attributes: ['id', 'name'],
          required: false,
        },
      ],
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
