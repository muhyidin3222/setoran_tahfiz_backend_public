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
exports.BeritaController = void 0;
const common_1 = require("@nestjs/common");
const berita_service_1 = require("./berita.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const berita_dto_1 = require("./berita.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_constants_1 = require("../auth/auth.constants");
const throttler_1 = require("@nestjs/throttler");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const tag_entity_1 = require("../tag/tag.entity");
let BeritaController = class BeritaController {
    constructor(beritaService, userRepository) {
        this.beritaService = beritaService;
        this.userRepository = userRepository;
    }
    async get(query, request) {
        var _a;
        const { user } = request;
        const getUser = await this.userRepository.findOne({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            attributes: ['id_school'],
        });
        const where = {
            id_school: (_a = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _a === void 0 ? void 0 : _a.id_school,
        };
        if (query === null || query === void 0 ? void 0 : query.id_tag) {
            where.id_tag = query === null || query === void 0 ? void 0 : query.id_tag;
        }
        if ((query === null || query === void 0 ? void 0 : query.type) === 'top') {
            where.top = 1;
        }
        const responseData = await this.beritaService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getAdmin(query, request) {
        const { user } = request;
        const where = {
            id_school: user === null || user === void 0 ? void 0 : user.id,
        };
        const responseData = await this.beritaService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body, request) {
        const { user } = request;
        const id_school = user === null || user === void 0 ? void 0 : user.id;
        const responseData = await this.beritaService.createService(Object.assign(Object.assign({}, body), { id_school }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body, request) {
        const { user } = request;
        const id_school = user === null || user === void 0 ? void 0 : user.id;
        const responseData = await this.beritaService.updateAdminService(body, {
            id: body === null || body === void 0 ? void 0 : body.id,
            id_school,
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id, request) {
        const { user } = request;
        const id_school = user === null || user === void 0 ? void 0 : user.id;
        const responseData = await this.beritaService.deleteService({
            id,
            id_school,
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detailAdmin(param) {
        const responseData = await this.beritaService.detailService({
            where: {
                id: param.id,
            },
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detail(param) {
        const responseData = await this.beritaService.detailService({
            where: {
                id: param.id,
            },
            include: [
                {
                    model: tag_entity_1.TagEntity,
                    as: 'tag',
                    attributes: ['id', 'name'],
                    required: false,
                },
            ],
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
};
__decorate([
    (0, common_1.CacheKey)('berita_get'),
    (0, common_1.CacheTTL)(30),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    (0, common_1.Get)('/user/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [berita_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "get", null);
__decorate([
    (0, common_1.CacheKey)('berita_get'),
    (0, common_1.CacheTTL)(30),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Get)('/admin/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [berita_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "getAdmin", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/admin/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [berita_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/admin/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [berita_dto_1.ParamUpdate, Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/admin/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/admin/detail/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.master_admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "detailAdmin", null);
__decorate([
    (0, common_1.Get)('/user/detail/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BeritaController.prototype, "detail", null);
BeritaController = __decorate([
    (0, common_1.Controller)('berita'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [berita_service_1.BeritaService, Object])
], BeritaController);
exports.BeritaController = BeritaController;
//# sourceMappingURL=berita.controller.js.map