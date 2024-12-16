import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import { momentTz } from '../common/extends/entity-master';

const moment = require('moment');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    // console.log(exceptionResponse,"exceptionResponse")
    const responseHttps =
      (exceptionResponse &&
        ((exceptionResponse['response'] &&
          exceptionResponse['response']['message']) ||
          exceptionResponse['message'])) ||
      null;
    const message = exception?.message || null;
    // console.log(message, responseHttps, `===> message, responseHttps`);
    const bodyRespone: any = {
      status_code: status,
      timestamp: moment().unix(),
      path: request.url,
      method: request.method,
      status_message: message,
    };
    if (message !== responseHttps) bodyRespone.response = responseHttps;

    if (message === 'Unauthorized') bodyRespone.response = 'Invalid Token';

    response.status(status).send(bodyRespone);
  }
}
