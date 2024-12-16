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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_constants_1 = require("../auth/auth.constants");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const multer_1 = require("multer");
const image_1 = require("../common/library/image");
const config_service_1 = require("../common/library/config.service");
const respone_1 = __importDefault(require("../common/library/respone"));
let AppController = class AppController {
    constructor(appService, configService) {
        this.appService = appService;
        this.configService = configService;
    }
    main() {
        return this.appService.main();
    }
    async sendEmail() {
        return 'sucess';
    }
    async home() {
        const resHome = await this.appService.home();
        return resHome;
    }
    async subscribeTopi(request) {
        const { user } = request;
        await this.appService.subscribe(user.id);
        return {};
    }
    async uploadedFile(file) {
        const URL_API = await this.configService.get('URL_API');
        const response = {
            originalname: file.originalname,
            filename: file.filename.replace(/\s/g, ''),
            url: `${URL_API}/image/${file.filename.replace(/\s/g, '')}`,
        };
        return response;
    }
    seeUploadedFile(image, res) {
        return res.sendFile(image, { root: './files' });
    }
    async homeChart(request) {
        const { user } = request;
        const homeApp = await this.appService.homeChart(user.id);
        return (0, respone_1.default)({
            data: homeApp.rows,
            total: homeApp.count,
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "main", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.Post)('/send-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.CacheKey)('home_get'),
    (0, common_1.CacheTTL)(30),
    (0, common_1.Get)('/home'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "home", null);
__decorate([
    (0, common_1.Post)('/frist-get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "subscribeTopi", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user, auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/upload_image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './files',
            filename: image_1.editFileName,
        }),
        fileFilter: image_1.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Get)('image/:imgpath'),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "seeUploadedFile", null);
__decorate([
    (0, common_1.Get)('/home/chart'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "homeChart", null);
AppController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        config_service_1.ConfigService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map