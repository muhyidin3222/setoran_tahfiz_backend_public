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
exports.GuideTahfidzController = void 0;
const common_1 = require("@nestjs/common");
const guide_tahfidz_service_1 = require("./guide-tahfidz.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const guide_tahfidz_dto_1 = require("./guide-tahfidz.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_constants_1 = require("../auth/auth.constants");
const roles_decorator_1 = require("../auth/roles.decorator");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const sequelize_1 = require("sequelize");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const guide_tahfidz_entity_1 = require("./guide-tahfidz.entity");
let GuideTahfidzController = class GuideTahfidzController {
    constructor(guideTahfidzService, userSetoranRepository, userRepository, studentRepository, levelTahfidzRepository) {
        this.guideTahfidzService = guideTahfidzService;
        this.userSetoranRepository = userSetoranRepository;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.levelTahfidzRepository = levelTahfidzRepository;
    }
    async get(query, request) {
        var _a;
        const { user } = request;
        let paginationSet = {};
        let where = {
            id_school: user === null || user === void 0 ? void 0 : user.id,
        };
        if (query === null || query === void 0 ? void 0 : query.page) {
            paginationSet = (0, pagination_1.pagination)(query);
        }
        if ((_a = query === null || query === void 0 ? void 0 : query.search) === null || _a === void 0 ? void 0 : _a.length) {
            if ((query === null || query === void 0 ? void 0 : query.type_search) === 'no') {
                where = Object.assign(Object.assign({}, where), { no: {
                        [sequelize_1.Op.like]: `%${query === null || query === void 0 ? void 0 : query.search}%`,
                    } });
            }
            if ((query === null || query === void 0 ? void 0 : query.type_search) === 'name') {
                where = Object.assign(Object.assign({}, where), { name: {
                        [sequelize_1.Op.like]: `%${query === null || query === void 0 ? void 0 : query.search}%`,
                    } });
            }
        }
        if (query === null || query === void 0 ? void 0 : query.level_tahfidz) {
            where.id_level_tahfidz = query === null || query === void 0 ? void 0 : query.level_tahfidz;
        }
        const responseData = await this.guideTahfidzService.getService(Object.assign(Object.assign({}, paginationSet), { where: where, include: [
                {
                    model: level_tahfidz_entity_1.LevelTahfidzEntity,
                    as: 'levelTahfidz',
                    attributes: ['id', 'name'],
                    required: true,
                },
            ], order: [['no', 'DESC']] }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getUser(query, request) {
        var _a;
        let paginationSet = {};
        const where = {};
        const { user } = request;
        const getUser = await this.userRepository.findOne({
            where: {
                id: user.id,
            },
            attributes: ['id_school', 'type_user'],
        });
        where.id_school = (_a = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _a === void 0 ? void 0 : _a.id_school;
        if (query === null || query === void 0 ? void 0 : query.page) {
            paginationSet = (0, pagination_1.pagination)(query);
        }
        if (query === null || query === void 0 ? void 0 : query.search) {
            where[sequelize_1.Op.or] = [
                {
                    name: {
                        [sequelize_1.Op.like]: `%${query === null || query === void 0 ? void 0 : query.search}%`,
                    },
                },
                {
                    description: {
                        [sequelize_1.Op.like]: `%${query === null || query === void 0 ? void 0 : query.search}%`,
                    },
                },
            ];
        }
        if (query === null || query === void 0 ? void 0 : query.level_tahfidz) {
            where.id_level_tahfidz = query.level_tahfidz;
        }
        const responseData = await this.guideTahfidzService.getService(Object.assign(Object.assign({}, paginationSet), { where: where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getUserLast(query) {
        var _a, _b, _c, _d, _e, _f;
        const getUser = await this.studentRepository.findOne({
            where: {
                id: query.id_student,
            },
            attributes: ['id_school'],
        });
        const lastSetoran = await this.userSetoranRepository.findOne({
            where: {
                id_student: query.id_student,
            },
            attributes: ['id_guide_tahfidz'],
            order: [['created_at', 'DESC']],
            include: {
                model: guide_tahfidz_entity_1.GuideTahfidzEntity,
                as: 'guideTahfidz',
                attributes: ['id_level_tahfidz', 'no'],
                required: true,
                order: [['no', 'ASC']],
            },
        });
        const no_guide_tahfidz = (_b = (_a = lastSetoran === null || lastSetoran === void 0 ? void 0 : lastSetoran.dataValues) === null || _a === void 0 ? void 0 : _a.guideTahfidz) === null || _b === void 0 ? void 0 : _b.no;
        const id_level_tahfidz = (_d = (_c = lastSetoran === null || lastSetoran === void 0 ? void 0 : lastSetoran.dataValues) === null || _c === void 0 ? void 0 : _c.guideTahfidz) === null || _d === void 0 ? void 0 : _d.id_level_tahfidz;
        let whereAnd;
        if ((_e = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _e === void 0 ? void 0 : _e.id_school) {
            whereAnd = {
                id_school: (_f = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _f === void 0 ? void 0 : _f.id_school,
            };
        }
        else {
            return (0, respone_1.default)({
                data: [],
            });
        }
        if (id_level_tahfidz) {
            whereAnd.id_level_tahfidz = id_level_tahfidz;
        }
        const responseData = await this.guideTahfidzService.getServiceLastTahfidz({
            where: {
                [sequelize_1.Op.and]: [
                    whereAnd,
                    {
                        no: {
                            [sequelize_1.Op.gte]: no_guide_tahfidz || 1,
                        },
                    },
                ],
            },
            limit: 4,
        });
        return (0, respone_1.default)({
            data: no_guide_tahfidz ? responseData : [{}, ...responseData],
        });
    }
    async create(body, request) {
        const { user } = request;
        const responseData = await this.guideTahfidzService.createService(Object.assign(Object.assign({}, body), { id_school: user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async createArray(body, request) {
        const { user } = request;
        const getLevelTahfidz = await this.levelTahfidzRepository.findAll({
            where: {
                id_school: user.id,
            },
            attributes: ['id', 'name'],
        });
        const mapingData = await Promise.all(body.map((value) => {
            var _a;
            if (!(value === null || value === void 0 ? void 0 : value.level_tahfidz)) {
                throw new common_1.BadGatewayException(`level tahfidz wajib di isi`);
            }
            if (!(value === null || value === void 0 ? void 0 : value.name)) {
                throw new common_1.BadGatewayException(`name wajib di isi`);
            }
            if (!(value === null || value === void 0 ? void 0 : value.no)) {
                throw new common_1.BadGatewayException(`no wajib di isi`);
            }
            const id_level_tahfidz = getLevelTahfidz === null || getLevelTahfidz === void 0 ? void 0 : getLevelTahfidz.find((val) => {
                var _a;
                return ((_a = val === null || val === void 0 ? void 0 : val.dataValues) === null || _a === void 0 ? void 0 : _a.name) === (value === null || value === void 0 ? void 0 : value.level_tahfidz);
            });
            if (!id_level_tahfidz) {
                throw new common_1.BadGatewayException(`not found level tahfidz ${value === null || value === void 0 ? void 0 : value.level_tahfidz}`);
            }
            return {
                name: value === null || value === void 0 ? void 0 : value.name,
                no: value === null || value === void 0 ? void 0 : value.no,
                id_level_tahfidz: (_a = id_level_tahfidz === null || id_level_tahfidz === void 0 ? void 0 : id_level_tahfidz.dataValues) === null || _a === void 0 ? void 0 : _a.id,
                id_school: user.id,
            };
        }));
        const responseData = await this.guideTahfidzService.createServiceArray(mapingData);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body) {
        const responseData = await this.guideTahfidzService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.guideTahfidzService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
};
__decorate([
    (0, common_1.Get)('/admin/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.master_admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guide_tahfidz_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/user/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guide_tahfidz_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/user/last'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "getUserLast", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guide_tahfidz_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/create-array'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "createArray", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guide_tahfidz_dto_1.ParamUpdate]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuideTahfidzController.prototype, "delete", null);
GuideTahfidzController = __decorate([
    (0, common_1.Controller)('guide-tahfidz'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_setoran_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(3, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(4, (0, common_1.Inject)(master_provider_model_1.level_tahfidz_provider.provide)),
    __metadata("design:paramtypes", [guide_tahfidz_service_1.GuideTahfidzService, Object, Object, Object, Object])
], GuideTahfidzController);
exports.GuideTahfidzController = GuideTahfidzController;
//# sourceMappingURL=guide-tahfidz.controller.js.map