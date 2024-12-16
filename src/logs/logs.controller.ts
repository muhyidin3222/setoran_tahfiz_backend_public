import { Controller, Body, Post } from '@nestjs/common';
import { LogsService } from './logs.service';
import responeSuccess from '../common/library/respone';
import { ParamCreate } from './logs.dto';

@Controller('logs')
export class LogsController {
  constructor(private levelTahfidzService: LogsService) {}

  @Post('/create')
  async create(@Body() body: ParamCreate) {
    console.log(body);
    const responseData = await this.levelTahfidzService.createService(body);
    return responeSuccess({
      data: responseData,
    });
  }
}
