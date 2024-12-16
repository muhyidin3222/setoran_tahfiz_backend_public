import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpExceptionFilter } from './http-exception.filter';

@Injectable()
export class JoinValidationPipe implements PipeTransform<any> {
  @UseFilters(HttpExceptionFilter)
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await (
      await validate(object, { whitelist: true, forbidNonWhitelisted: true })
    ).map((itemParam) => ({
      value: itemParam.value,
      property: itemParam.property,
      status_message: itemParam.constraints,
    }));
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
