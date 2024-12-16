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
import { ClassService } from './class.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import {
  MasterParamCreate,
  MasterParamGet,
  MasterParamUpdate,
} from './class.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { dataConstants } from 'src/auth/auth.constants';
import { Throttle } from '@nestjs/throttler';
import { user_provider } from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';

@Controller('class')
export class ClassController {
  constructor(
    private classService: ClassService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
  ) {}

  @Get('/master/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async getUserClass(@Query() query: MasterParamGet, @Req() request) {
    const { user } = request;
    const where: any = {
      id_school: user?.id,
    };
    const responseData = await this.classService.getMasterClassService({
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
  @Post('/master/create')
  async createUserClass(@Body() body: MasterParamCreate, @Req() request) {
    const { user } = request;
    const responseData = await this.classService.createMasterClassService({
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
  @Post('/master/update')
  async updateUserClass(@Body() body: MasterParamUpdate, @Req() request) {
    const { user } = request;
    const responseData = await this.classService.updateMasterClassService({
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
  @Delete('/master/delete/:id')
  async deleteUserClass(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() request,
  ) {
    const { user } = request;
    const responseData = await this.classService.deleteMasterClassService({
      id,
      id_school: user?.id,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/master/detail/:id')
  async detailUserClass(@Param() param: any) {
    const responseData = await this.classService.detailMasterClassService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/user/get')
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async get(@Query() query: MasterParamGet, @Req() request) {
    const userGet = await this.userRepository.findOne({
      where: {
        id: request.user.id,
      },
      attributes: ['id_school'],
    });
    const responseData = await this.classService.getUserClassService({
      ...pagination(query),
      where: {
        id_school: userGet?.id_school,
      },
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
  @Post('/user/create')
  async create(@Body() body: MasterParamCreate) {
    const responseData = await this.classService.createUserClassService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/user/update')
  async update(@Body() body: MasterParamUpdate) {
    const responseData = await this.classService.updateUserClassService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/user/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.classService.deleteUserClassService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/user/detail/:id')
  async detail(@Param() param: any) {
    const responseData = await this.classService.detailUserClassService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
