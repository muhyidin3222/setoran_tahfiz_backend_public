"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const moment = require('moment');
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const responseHttps = (exceptionResponse &&
            ((exceptionResponse['response'] &&
                exceptionResponse['response']['message']) ||
                exceptionResponse['message'])) ||
            null;
        const message = (exception === null || exception === void 0 ? void 0 : exception.message) || null;
        const bodyRespone = {
            status_code: status,
            timestamp: moment().unix(),
            path: request.url,
            method: request.method,
            status_message: message,
        };
        if (message !== responseHttps)
            bodyRespone.response = responseHttps;
        if (message === 'Unauthorized')
            bodyRespone.response = 'Invalid Token';
        response.status(status).send(bodyRespone);
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map