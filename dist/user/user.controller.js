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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const user_dto_1 = require("./user.dto");
const roles_guard_1 = require("../auth/roles.guard");
const auth_constants_1 = require("../auth/auth.constants");
const roles_decorator_1 = require("../auth/roles.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const school_entity_1 = require("../school/school.entity");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const user_class_entity_1 = require("../class/user_class.entity");
const master_class_entity_1 = require("../class/master_class.entity");
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const sequelize_1 = require("sequelize");
const user_entity_1 = require("./user.entity");
let UserController = class UserController {
    constructor(userService, studentRepository, userSetoranRepository) {
        this.userService = userService;
        this.studentRepository = studentRepository;
        this.userSetoranRepository = userSetoranRepository;
    }
    async get(query, request) {
        const { type_user } = query || {};
        const { user } = request;
        let where = {
            id_school: user === null || user === void 0 ? void 0 : user.id,
        };
        if (type_user) {
            where.type_user = type_user;
        }
        if (query === null || query === void 0 ? void 0 : query.search) {
            where = Object.assign(Object.assign({}, where), { [sequelize_1.Op.or]: [
                    {
                        name: {
                            [sequelize_1.Op.like]: `%${query.search}%`,
                        },
                    },
                    {
                        email: {
                            [sequelize_1.Op.like]: `${query.search}%`,
                        },
                    },
                ] });
        }
        const responseData = await this.userService.getService(Object.assign({ where: where }, (0, pagination_1.pagination)(query)));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getSearch(query) {
        const where = {
            id_school: null,
        };
        if (query === null || query === void 0 ? void 0 : query.search) {
            where.email = {
                [sequelize_1.Op.like]: `%${query.search}`,
            };
        }
        if (query === null || query === void 0 ? void 0 : query.type_user) {
            where.type_user = {
                [sequelize_1.Op.like]: `%${query.type_user}`,
            };
        }
        const responseData = await this.userService.getFindAll(Object.assign(Object.assign({ where }, (0, pagination_1.pagination)(query)), { attributes: ['id', 'email', 'name', 'id_school'] }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detail(param, request) {
        var _a, _b;
        const { user } = request;
        const responseData = await this.userService.detailService({
            where: {
                id: param.id,
            },
            attributes: [
                'id',
                'name',
                'email',
                'phone',
                'photo',
                'gender',
                'date_of_birth',
                'about',
                'id_school',
                'id_student',
                'created_at',
                'type_user',
                'version',
            ],
        });
        if (((_a = responseData === null || responseData === void 0 ? void 0 : responseData.dataValues) === null || _a === void 0 ? void 0 : _a.type_user) === 'user') {
            if ((user === null || user === void 0 ? void 0 : user.id) === Number(param === null || param === void 0 ? void 0 : param.id)) {
                const checkStatusLogin = await this.userService.checkStatusLogin((_b = responseData === null || responseData === void 0 ? void 0 : responseData.dataValues) === null || _b === void 0 ? void 0 : _b.email);
                return (0, respone_1.default)({
                    data: Object.assign(Object.assign({}, responseData.dataValues), checkStatusLogin),
                });
            }
            else {
                throw new common_1.BadGatewayException('Not Have Access');
            }
        }
        else {
            const adminResponse = await this.userService.detailService({
                where: {
                    id: param.id,
                },
            });
            return (0, respone_1.default)({
                data: adminResponse,
            });
        }
    }
    async detailUserAdmin(param) {
        const responseData = await this.userService.detailService({
            where: {
                id: param.id,
            },
            attributes: [
                'id',
                'name',
                'email',
                'phone',
                'photo',
                'id_school',
                'created_at',
                'type_user',
                'step_register',
            ],
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async self(request) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { user } = request;
        let student = {};
        let schoolClass = {};
        const responseData = await this.userService.detailService({
            where: {
                id: user.id,
            },
            attributes: [
                'id',
                'name',
                'email',
                'phone',
                'photo',
                'gender',
                'date_of_birth',
                'about',
                'id_school',
                'id_student',
                'location',
                'type_user',
            ],
        });
        if ((responseData === null || responseData === void 0 ? void 0 : responseData.type_user) === 'user') {
            const getStudent = await this.studentRepository.findOne({
                where: {
                    email_user: responseData === null || responseData === void 0 ? void 0 : responseData.email,
                },
                attributes: [
                    'id',
                    'full_name',
                    'no',
                    'date_of_birth',
                    'photo',
                    'gender',
                    'parent',
                ],
                include: [
                    {
                        model: user_class_entity_1.UserClassEntity,
                        attributes: ['id'],
                        as: 'userClass',
                        include: [
                            {
                                model: master_class_entity_1.MasterClassEntity,
                                attributes: ['name'],
                                as: 'masterClass',
                                include: [
                                    {
                                        model: user_entity_1.UserEntity,
                                        attributes: ['name'],
                                        as: 'waliKelas',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: school_entity_1.SchoolEntity,
                        attributes: ['name'],
                        as: 'schoolClass',
                    },
                ],
            });
            const { date_of_birth, full_name, userClass, no, gender, photo, parent } = (getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues) || {};
            student = {
                id: (_a = getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues) === null || _a === void 0 ? void 0 : _a.id,
                full_name: full_name,
                parent,
                no,
                gender,
                photo,
                date_of_birth,
                classStudent: {
                    name: (_b = userClass === null || userClass === void 0 ? void 0 : userClass.masterClass) === null || _b === void 0 ? void 0 : _b.name,
                    id: (_c = userClass === null || userClass === void 0 ? void 0 : userClass.masterClass) === null || _c === void 0 ? void 0 : _c.id,
                    waliKelas: (_e = (_d = userClass === null || userClass === void 0 ? void 0 : userClass.masterClass) === null || _d === void 0 ? void 0 : _d.waliKelas) === null || _e === void 0 ? void 0 : _e.name,
                },
            };
            schoolClass = (_f = getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues) === null || _f === void 0 ? void 0 : _f.schoolClass;
            const lastSetoran = await this.userSetoranRepository.findOne({
                where: {
                    id_user: user === null || user === void 0 ? void 0 : user.id,
                },
                include: [
                    {
                        model: guide_tahfidz_entity_1.GuideTahfidzEntity,
                        as: 'guideTahfidz',
                        attributes: ['id'],
                        required: true,
                        include: [
                            {
                                model: level_tahfidz_entity_1.LevelTahfidzEntity,
                                as: 'levelTahfidz',
                                attributes: ['id', 'name'],
                                required: true,
                            },
                        ],
                    },
                ],
                attributes: ['id', 'id_student'],
                order: [['created_at', 'DESC']],
            });
            return (0, respone_1.default)({
                data: Object.assign(Object.assign({}, responseData.dataValues), { student, levelTahfidz: (_h = (_g = lastSetoran === null || lastSetoran === void 0 ? void 0 : lastSetoran.dataValues) === null || _g === void 0 ? void 0 : _g.guideTahfidz) === null || _h === void 0 ? void 0 : _h.levelTahfidz, school: schoolClass }),
            });
        }
        else {
            return (0, respone_1.default)({
                data: responseData,
            });
        }
    }
    async create(body) {
        const responseData = await this.userService.createService(Object.assign({}, body));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async updateSelf(body, request) {
        const { user } = request;
        if ((user === null || user === void 0 ? void 0 : user.id) !== (body === null || body === void 0 ? void 0 : body.id)) {
            throw new common_1.BadRequestException('Not Have Access');
        }
        const responseData = await this.userService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async updateAdmin(body) {
        const responseData = await this.userService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.userService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detailAdmin(request) {
        const { user } = request;
        const responseData = await this.userService.detailAdminService({
            where: {
                id: user.id,
            },
            attributes: ['id', 'email', 'id_school', 'created_at'],
            include: [
                {
                    model: school_entity_1.SchoolEntity,
                    attributes: ['name', 'photo', 'total_student', 'description'],
                },
            ],
        });
        return (0, respone_1.default)({
            data: responseData,
        });
    }
};
__decorate([
    (0, common_1.Get)('/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/admin/search'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ParamGet]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSearch", null);
__decorate([
    (0, common_1.Get)('/detail/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.user, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "detail", null);
__decorate([
    (0, common_1.Get)('/admin/detail/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.user, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "detailUserAdmin", null);
__decorate([
    (0, common_1.Get)('/self'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "self", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ParamCreate]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/update/self'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ParamUpdate, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateSelf", null);
__decorate([
    (0, common_1.Post)('/admin/update'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.master_admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ParamUpdateAdmin]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/admin/self'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "detailAdmin", null);
UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.user_setoran_provider.provide)),
    __metadata("design:paramtypes", [user_service_1.UserService, Object, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map