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
} from '@nestjs/common';
import { SchoolService } from './school.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamCreate, ParamGet, ParamUpdate } from './school.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { dataConstants } from 'src/auth/auth.constants';
import { Throttle } from '@nestjs/throttler';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Get('/get')
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async get(@Query() query: ParamGet) {
    const where: any = {};
    const responseData = await this.schoolService.getService({
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
  async create(@Body() body: ParamCreate) {
    const responseData = await this.schoolService.createService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/update')
  async update(@Body() body: ParamUpdate) {
    const responseData = await this.schoolService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.schoolService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/detail/:id')
  async detail(@Param() param: any) {
    const responseData = await this.schoolService.detailService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/period/get')
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async getPeriod(@Query() query: ParamGet) {
    const where: any = {};
    const responseData = await this.schoolService.getService({
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
  @Post('/period/create')
  async createPeriod(@Body() body: ParamCreate) {
    const responseData = await this.schoolService.createService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/period/update')
  async updatePeriod(@Body() body: ParamUpdate) {
    const responseData = await this.schoolService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/period/delete/:id')
  async deletePeriod(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.schoolService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/period/detail/:id')
  async detailPeriod(@Param() param: any) {
    const responseData = await this.schoolService.detailService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
