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
exports.SchoolController = void 0;
const common_1 = require("@nestjs/common");
const school_service_1 = require("./school.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const school_dto_1 = require("./school.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_constants_1 = require("../auth/auth.constants");
const throttler_1 = require("@nestjs/throttler");
let SchoolController = class SchoolController {
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    async get(query) {
        const where = {};
        const responseData = await this.schoolService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body) {
        const responseData = await this.schoolService.createService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body) {
        const responseData = await this.schoolService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.schoolService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detail(param) {
        const responseData = await this.schoolService.detailService({
            where: {
                id: param.id,
            },
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async getPeriod(query) {
        const where = {};
        const responseData = await this.schoolService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async createPeriod(body) {
        const responseData = await this.schoolService.createService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async updatePeriod(body) {
        const responseData = await this.schoolService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async deletePeriod(id) {
        const responseData = await this.schoolService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detailPeriod(param) {
        const responseData = await this.schoolService.detailService({
            where: {
                id: param.id,
            },
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
};
__decorate([
    (0, common_1.Get)('/get'),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.ParamGet]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "get", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.ParamCreate]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.ParamUpdate]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "detail", null);
__decorate([
    (0, common_1.Get)('/period/get'),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.ParamGet]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "getPeriod", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/period/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.ParamCreate]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "createPeriod", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/period/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.ParamUpdate]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "updatePeriod", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/period/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "deletePeriod", null);
__decorate([
    (0, common_1.Get)('/period/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "detailPeriod", null);
SchoolController = __decorate([
    (0, common_1.Controller)('school'),
    __metadata("design:paramtypes", [school_service_1.SchoolService])
], SchoolController);
exports.SchoolController = SchoolController;
//# sourceMappingURL=school.controller.js.map