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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const tag_dto_1 = require("./tag.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_constants_1 = require("../auth/auth.constants");
const roles_decorator_1 = require("../auth/roles.decorator");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let TagController = class TagController {
    constructor(tagService, userRepository) {
        this.tagService = tagService;
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
        let paginationSet = {};
        if (query === null || query === void 0 ? void 0 : query.page) {
            paginationSet = (0, pagination_1.pagination)(query);
        }
        const responseData = await this.tagService.getService(Object.assign(Object.assign({}, paginationSet), { where }));
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
        let paginationSet = {};
        if (query === null || query === void 0 ? void 0 : query.page) {
            paginationSet = (0, pagination_1.pagination)(query);
        }
        const responseData = await this.tagService.getService(Object.assign(Object.assign({}, paginationSet), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body, request) {
        const { user } = request;
        const responseData = await this.tagService.createService(Object.assign(Object.assign({}, body), { id_school: user === null || user === void 0 ? void 0 : user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body) {
        const responseData = await this.tagService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.tagService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
};
__decorate([
    (0, common_1.CacheKey)('tag_get'),
    (0, common_1.CacheTTL)(30),
    (0, common_1.Get)('/user/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/admin/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.ParamCreate]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "delete", null);
TagController = __decorate([
    (0, common_1.Controller)('tag'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [tag_service_1.TagService, Object])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map