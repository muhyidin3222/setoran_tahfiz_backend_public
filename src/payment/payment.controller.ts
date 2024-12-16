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
import { PaymentService } from './payment.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamCreate, ParamGet, ParamUpdate } from './payment.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { dataConstants } from 'src/auth/auth.constants';
import { Throttle } from '@nestjs/throttler';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('/get')
  @Roles(dataConstants.master_admin, dataConstants.admin)
  async get(@Query() query: ParamGet) {
    const where: any = {};
    const responseData = await this.paymentService.getService({
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
    const responseData = await this.paymentService.createService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/update')
  async update(@Body() body: ParamUpdate) {
    const responseData = await this.paymentService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.paymentService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/detail/:id')
  async detail(@Param() param: any) {
    const responseData = await this.paymentService.detailService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
