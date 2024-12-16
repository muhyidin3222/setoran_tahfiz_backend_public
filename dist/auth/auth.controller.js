"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const roles_guard_1 = require("./roles.guard");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const roles_decorator_1 = require("./roles.decorator");
const auth_constants_1 = require("./auth.constants");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async gogoleLogin(userParamBody) {
        const responseData = await this.authService.loginGoogleService(userParamBody);
        return {
            status_code: '200',
            status_message: 'Login success, your token will expire in 30 days.',
            data: responseData,
        };
    }
    async loginAdmin(userParamBody) {
        const responseData = await this.authService.loginAdminService(userParamBody);
        return {
            status_code: '200',
            status_message: 'Login success, your token will expire in 30 days.',
            data: responseData,
        };
    }
    async verification(userParamBody) {
        const responseData = await this.authService.verificationOtp(userParamBody);
        return {
            status_code: '200',
            status_message: 'Login success, your token will expire in 30 days.',
            data: responseData,
        };
    }
    async loginUUser(userParamBody) {
        const responseData = await this.authService.loginService(userParamBody);
        return {
            status_code: '200',
            status_message: 'Login success, your token will expire in 30 days.',
            data: responseData,
        };
    }
    async submitDaftar(body, request) {
        const { user } = request;
        const responseData = await this.authService.daftarService(Object.assign({ id_user: user === null || user === void 0 ? void 0 : user.id }, body));
        return {
            status_code: '200',
            status_message: 'Logout succes.',
            data: responseData,
        };
    }
    async logout(request) {
        const { user } = request;
        const responseData = await this.authService.logoutService(user === null || user === void 0 ? void 0 : user.id);
        return {
            status_code: '200',
            status_message: 'Logout succes.',
            data: responseData,
        };
    }
};
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.Post)('/google-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ParamAuthGoogleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "gogoleLogin", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.Post)('/admin/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ParamAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ParamAuthVerifyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verification", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.Post)('/user/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ParamAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUUser", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    (0, common_1.Post)('/daftar'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ParamAuthDaftarDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "submitDaftar", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map