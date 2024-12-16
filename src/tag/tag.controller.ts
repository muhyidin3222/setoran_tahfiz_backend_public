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
import { TagService } from './tag.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamCreate, ParamGet } from './tag.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { dataConstants } from 'src/auth/auth.constants';
import { Roles } from 'src/auth/roles.decorator';
import { user_provider } from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';

@Controller('tag')
export class TagController {
  constructor(
    private tagService: TagService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  @CacheKey('tag_get')
  @CacheTTL(30)
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
    };
    let paginationSet = {};
    if (query?.page) {
      paginationSet = pagination(query);
    }
    const responseData = await this.tagService.getService({
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
    };
    let paginationSet = {};
    if (query?.page) {
      paginationSet = pagination(query);
    }
    const responseData = await this.tagService.getService({
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
    const responseData = await this.tagService.createService({
      ...body,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/update')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async update(@Body() body: ParamCreate) {
    const responseData = await this.tagService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @Delete('/delete/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.tagService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }
}
