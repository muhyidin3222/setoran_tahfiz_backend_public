import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamGet } from './notification.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { dataConstants } from 'src/auth/auth.constants';
import { Roles } from 'src/auth/roles.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('/user/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async get(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const responseData = await this.notificationService.getService({
      ...pagination(query),
      where: {
        id_user: user?.id,
      },
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }
}
