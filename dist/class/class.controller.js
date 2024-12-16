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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const class_dto_1 = require("./class.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_constants_1 = require("../auth/auth.constants");
const throttler_1 = require("@nestjs/throttler");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let ClassController = class ClassController {
    constructor(classService, userRepository) {
        this.classService = classService;
        this.userRepository = userRepository;
    }
    async getUserClass(query, request) {
        const { user } = request;
        const where = {
            id_school: user === null || user === void 0 ? void 0 : user.id,
        };
        const responseData = await this.classService.getMasterClassService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async createUserClass(body, request) {
        const { user } = request;
        const responseData = await this.classService.createMasterClassService(Object.assign(Object.assign({}, body), { id_school: user === null || user === void 0 ? void 0 : user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async updateUserClass(body, request) {
        const { user } = request;
        const responseData = await this.classService.updateMasterClassService(Object.assign(Object.assign({}, body), { id_school: user === null || user === void 0 ? void 0 : user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async deleteUserClass(id, request) {
        const { user } = request;
        const responseData = await this.classService.deleteMasterClassService({
            id,
            id_school: user === null || user === void 0 ? void 0 : user.id,
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detailUserClass(param) {
        const responseData = await this.classService.detailMasterClassService({
            where: {
                id: param.id,
            },
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async get(query, request) {
        const userGet = await this.userRepository.findOne({
            where: {
                id: request.user.id,
            },
            attributes: ['id_school'],
        });
        const responseData = await this.classService.getUserClassService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where: {
                id_school: userGet === null || userGet === void 0 ? void 0 : userGet.id_school,
            } }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body) {
        const responseData = await this.classService.createUserClassService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body) {
        const responseData = await this.classService.updateUserClassService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.classService.deleteUserClassService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detail(param) {
        const responseData = await this.classService.detailUserClassService({
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
    (0, common_1.Get)('/master/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.MasterParamGet, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getUserClass", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/master/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.MasterParamCreate, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "createUserClass", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/master/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.MasterParamUpdate, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "updateUserClass", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/master/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "deleteUserClass", null);
__decorate([
    (0, common_1.Get)('/master/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "detailUserClass", null);
__decorate([
    (0, common_1.Get)('/user/get'),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.MasterParamGet, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "get", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/user/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.MasterParamCreate]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/user/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.MasterParamUpdate]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/user/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/user/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "detail", null);
ClassController = __decorate([
    (0, common_1.Controller)('class'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [class_service_1.ClassService, Object])
], ClassController);
exports.ClassController = ClassController;
//# sourceMappingURL=class.controller.js.map