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
  BadRequestException,
} from '@nestjs/common';
import { SetoranTahfidzService } from './setoran-tahfidz.service';
import responeSuccess from '../common/library/respone';
import { pagination } from 'src/common/library/pagination';
import { ParamAdminGet, ParamCreate, ParamGet, ParamUpdate } from './setoran-tahfidz.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { dataConstants } from 'src/auth/auth.constants';
import { Throttle } from '@nestjs/throttler';
import {
  student_provider,
  user_provider,
  user_setoran_provider,
} from 'src/common/provider/master-provider-model';
import { UserEntity } from 'src/user/user.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserSetoranEntity } from './user-setoran.entity';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';

@Controller('setoran-tahfidz')
export class SetoranTahfidzController {
  constructor(
    private setoranTahfidzService: SetoranTahfidzService,
    @Inject(user_provider.provide)
    private userRepository: typeof UserEntity,
    @Inject(student_provider.provide)
    private studentRepository: typeof StudentEntity,
    @Inject(user_setoran_provider.provide)
    private userSetoranRepository: typeof UserSetoranEntity,
  ) { }

  @Get('/get')
  @Roles(dataConstants.master_admin, dataConstants.admin, dataConstants.ustadz)
  async get(@Query() query: ParamGet) {
    const where: any = {};
    const responseData = await this.setoranTahfidzService.getService({
      ...pagination(query),
      where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/user/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.ustadz, dataConstants.user)
  async getUser(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      attributes: ['id', 'email'],
    });
    const getIdStudent = await this.studentRepository.findOne({
      where: {
        email_user: getUser.dataValues?.email,
      },
      attributes: ['id'],
    });
    const where: any = {
      id_student: getIdStudent?.dataValues?.id,
    };
    const responseData = await this.setoranTahfidzService.getService({
      ...pagination(query),
      where,
    });
    return responeSuccess({
      total: responseData.count,
      data: responseData.rows,
    });
  }

  @Get('/ustadz/get')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.ustadz, dataConstants.user)
  async getUstadz(@Query() query: ParamGet, @Req() request) {
    const { user } = request;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user.id,
        type_user: dataConstants.ustadz,
      },
      attributes: ['type_user'],
    });
    if (!getUser?.dataValues?.type_user) {
      throw new BadRequestException('not have access');
    }
    const where: any = {};
    if (query.type === 'by_ustadz') {
      where.id_user_menyimak = user.id;
    }
    if (query.type === 'by_user' && query.id_student) {
      where.id_student = query.id_student;
    }
    const responseData = await this.setoranTahfidzService.getService({
      ...pagination(query),
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
  @Roles(dataConstants.admin, dataConstants.master_admin)
  async getAdmin(@Query() query: ParamAdminGet) {
    const where: any = {
      id_student: query.id_student,
    };
    const responseData = await this.setoranTahfidzService.getService({
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
  @Roles(dataConstants.master_admin, dataConstants.admin, dataConstants.user)
  @Post('/create')
  async create(@Body() body: ParamCreate, @Req() request) {
    const { user } = request;
    const getUser = await this.userRepository.findOne({
      where: {
        id: user.id,
        type_user: dataConstants.ustadz,
      },
      attributes: ['type_user'],
    });
    if (getUser?.dataValues?.type_user !== dataConstants.ustadz) {
      throw new BadRequestException('not have access');
    }
    const responseData = await this.setoranTahfidzService.createSetoranTahfidz({
      id_user_menyimak: user.id,
      ...body,
    });
    return responeSuccess({
      data: responseData,
    });
  }

  // @Throttle(5, 10)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/check-sertifikat')
  async createSertifikat(@Body() body: any) {
    console.log(body)
    const setoranTahfidzGetAll = await this.userSetoranRepository.findAll({
      ...pagination({ total: String(body.total), page: String(1) }),
      where: {
        id_level_tahfidz: body.id_level_tahfidz,
      },
      include: [
        {
          model: GuideTahfidzEntity,
          as: 'guideTahfidz',
          where: {
            no: body.no
          },
          attributes: ['id', 'no'],
          required: true,
        },
        {
          model: StudentEntity,
          as: 'student',
          attributes: ['id', 'full_name', 'photo','id_school'],
          required: true,
        },
      ],
      attributes: ['id_student', 'id_user', 'id']
    })

    await Promise.all(setoranTahfidzGetAll.map(async value => {
      const { id_student, id_user, id, student } = value.dataValues
      console.log({ id_student, id_user, id })
      await this.setoranTahfidzService.createSertifikat({
        id_student,
        id_level_tahfidz: body.id_level_tahfidz,
        id_user,
        noLevelTahfidz: body.no,
        id_school: student.id_school,
        full_name: student.full_name,
      });
    }))
    return responeSuccess({
      data: 'responseData',
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Post('/update')
  async update(@Body() body: ParamUpdate) {
    const responseData = await this.setoranTahfidzService.updateService(body);
    return responeSuccess({
      data: responseData,
    });
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(dataConstants.master_admin, dataConstants.admin)
  @Delete('/delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const responseData = await this.setoranTahfidzService.deleteService(id);
    return responeSuccess({
      data: responseData,
    });
  }

  @Get('/user/detail/:id')
  async detail(@Param() param: any) {
    const responseData = await this.setoranTahfidzService.detailService({
      where: {
        id: param.id,
      },
    });
    return responeSuccess({
      data: responseData,
    });
  }
}
