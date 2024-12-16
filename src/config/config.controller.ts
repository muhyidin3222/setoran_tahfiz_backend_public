import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import responeSuccess from '../common/library/respone';
import { ParamUpdate } from './config.dto';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get('/get')
  async get() {
    const responseData = await this.configService.getService();
    return responeSuccess({
      data: responseData,
    });
  }

  @Post('/update')
  async update(@Body() body: ParamUpdate) {
    const responseData = await this.configService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @Delete('/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.configService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }
}
