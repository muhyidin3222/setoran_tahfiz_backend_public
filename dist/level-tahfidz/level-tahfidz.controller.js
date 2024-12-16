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
exports.LevelTahfidzController = void 0;
const common_1 = require("@nestjs/common");
const level_tahfidz_service_1 = require("./level-tahfidz.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const level_tahfidz_dto_1 = require("./level-tahfidz.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_constants_1 = require("../auth/auth.constants");
const roles_decorator_1 = require("../auth/roles.decorator");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const sequelize_1 = require("sequelize");
let LevelTahfidzController = class LevelTahfidzController {
    constructor(levelTahfidzService, userRepository) {
        this.levelTahfidzService = levelTahfidzService;
        this.userRepository = userRepository;
    }
    async get(query, request) {
        var _a;
        const userGet = await this.userRepository.findOne({
            where: {
                id: request.user.id,
            },
            attributes: ['id_school'],
        });
        let where = {
            id_school: userGet.id_school,
        };
        if ((_a = query === null || query === void 0 ? void 0 : query.search) === null || _a === void 0 ? void 0 : _a.length) {
            where = Object.assign(Object.assign({}, where), { name: {
                    [sequelize_1.Op.like]: `%${query === null || query === void 0 ? void 0 : query.search}%`,
                } });
        }
        const responseData = await this.levelTahfidzService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where: where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getAdmin(query, request) {
        let paginationSet = {};
        const where = {
            id_school: request.user.id,
        };
        if (query === null || query === void 0 ? void 0 : query.page) {
            paginationSet = (0, pagination_1.pagination)(query);
        }
        if (query.id_student) {
            where.id_student = query.id_student;
        }
        const responseData = await this.levelTahfidzService.getService(Object.assign(Object.assign({}, paginationSet), { where: where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body, request) {
        const { user } = request;
        const responseData = await this.levelTahfidzService.createService(Object.assign(Object.assign({}, body), { id_school: user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body, request) {
        const { user } = request;
        const responseData = await this.levelTahfidzService.updateService(Object.assign(Object.assign({}, body), { id_school: user === null || user === void 0 ? void 0 : user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id, request) {
        const { user } = request;
        const responseData = await this.levelTahfidzService.deleteService({
            id,
            id_school: user === null || user === void 0 ? void 0 : user.id,
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
};
__decorate([
    (0, common_1.Get)('/user/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [level_tahfidz_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], LevelTahfidzController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/admin/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [level_tahfidz_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], LevelTahfidzController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [level_tahfidz_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], LevelTahfidzController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [level_tahfidz_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], LevelTahfidzController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LevelTahfidzController.prototype, "delete", null);
LevelTahfidzController = __decorate([
    (0, common_1.Controller)('level-tahfidz'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [level_tahfidz_service_1.LevelTahfidzService, Object])
], LevelTahfidzController);
exports.LevelTahfidzController = LevelTahfidzController;
//# sourceMappingURL=level-tahfidz.controller.js.map