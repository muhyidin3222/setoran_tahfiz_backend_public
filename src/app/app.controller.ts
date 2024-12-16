import {
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { dataConstants } from 'src/auth/auth.constants';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/common/library/image';
import { ConfigService } from 'src/common/library/config.service';
import responeSuccess from 'src/common/library/respone';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  main(): string {
    return this.appService.main();
  }

  @Throttle(5, 10)
  @Post('/send-email')
  async sendEmail(): Promise<string> {
    // await this.appService.sendEmail(body);
    return 'sucess';
  }

  @CacheKey('home_get')
  @CacheTTL(30)
  @Get('/home')
  async home(): Promise<any> {
    const resHome = await this.appService.home();
    return resHome;
  }

  @Post('/frist-get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user)
  async subscribeTopi(@Req() request): Promise<any> {
    const { user } = request;
    await this.appService.subscribe(user.id);
    return {};
  }

  @Throttle(5, 10)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.user, dataConstants.master_admin, dataConstants.admin)
  @Post('/upload_image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const URL_API = await this.configService.get('URL_API');
    const response = {
      originalname: file.originalname,
      filename: file.filename.replace(/\s/g, ''),
      url: `${URL_API}/image/${file.filename.replace(/\s/g, '')}`,
    };
    return response;
  }

  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Get('/home/chart')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.admin)
  async homeChart(@Req() request): Promise<any> {
    const { user } = request;
    const homeApp = await this.appService.homeChart(user.id);
    return responeSuccess({
      data: homeApp.rows,
      total: homeApp.count,
    });
  }
}
