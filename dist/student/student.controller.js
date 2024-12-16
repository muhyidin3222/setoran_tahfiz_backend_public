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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const student_dto_1 = require("./student.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_constants_1 = require("../auth/auth.constants");
const throttler_1 = require("@nestjs/throttler");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const user_entity_1 = require("../user/user.entity");
const sequelize_1 = require("sequelize");
const user_class_entity_1 = require("../class/user_class.entity");
const master_class_entity_1 = require("../class/master_class.entity");
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
let StudentController = class StudentController {
    constructor(studentService, userRepository, userSetoranRepository, masterClassRepository, studentRepository, achievementRepository) {
        this.studentService = studentService;
        this.userRepository = userRepository;
        this.userSetoranRepository = userSetoranRepository;
        this.masterClassRepository = masterClassRepository;
        this.studentRepository = studentRepository;
        this.achievementRepository = achievementRepository;
    }
    async get(query, request) {
        const { user } = request;
        const where = {
            id_school: user === null || user === void 0 ? void 0 : user.id,
        };
        if (query === null || query === void 0 ? void 0 : query.id_user_class) {
            where.id_user_class = query === null || query === void 0 ? void 0 : query.id_user_class;
        }
        const responseData = await this.studentService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getAdmin(query, request) {
        const { user } = request;
        let where = {
            id_school: user === null || user === void 0 ? void 0 : user.id,
        };
        let whereMasterClass = {};
        if (query === null || query === void 0 ? void 0 : query.search) {
            where = Object.assign(Object.assign({}, where), { [sequelize_1.Op.or]: [
                    {
                        full_name: {
                            [sequelize_1.Op.like]: `%${query.search}%`,
                        },
                    },
                    {
                        email_user: {
                            [sequelize_1.Op.like]: `${query.search}%`,
                        },
                    },
                ] });
        }
        if (query === null || query === void 0 ? void 0 : query.id_master_class) {
            whereMasterClass = {
                id: query === null || query === void 0 ? void 0 : query.id_master_class,
            };
        }
        const responseData = await this.studentService.getServiceAdmin(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where, include: [
                {
                    model: user_class_entity_1.UserClassEntity,
                    attributes: ['id'],
                    as: 'userClass',
                    required: (query === null || query === void 0 ? void 0 : query.id_master_class) ? true : false,
                    include: {
                        model: master_class_entity_1.MasterClassEntity,
                        attributes: ['name'],
                        as: 'masterClass',
                        required: (query === null || query === void 0 ? void 0 : query.id_master_class) ? true : false,
                        where: whereMasterClass,
                    },
                },
            ] }));
        const dataResponse = await Promise.all(responseData.rows.map(async (value) => {
            const countSetoranMurid = await this.userSetoranRepository.count({
                where: {
                    id_student: value.dataValues.id,
                },
            });
            const countSertifikat = await this.achievementRepository.count({
                where: {
                    id_student: value.dataValues.id,
                },
            });
            return Object.assign(Object.assign({}, value.dataValues), { countSetoranMurid,
                countSertifikat });
        }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: dataResponse,
        });
    }
    async createArray(body, request) {
        const { user } = request;
        const getMasterClass = await this.masterClassRepository.findAll({
            where: {
                id_school: user.id,
            },
            attributes: ['id', 'name'],
        });
        const mapingData = await Promise.all(body.map((value) => {
            const masterClass = getMasterClass === null || getMasterClass === void 0 ? void 0 : getMasterClass.find((val) => {
                var _a;
                return ((_a = val === null || val === void 0 ? void 0 : val.dataValues) === null || _a === void 0 ? void 0 : _a.name) === (value === null || value === void 0 ? void 0 : value.master_class);
            });
            return {
                masterClass,
                full_name: value === null || value === void 0 ? void 0 : value.full_name,
                no: value === null || value === void 0 ? void 0 : value.no,
                email_user: value === null || value === void 0 ? void 0 : value.email_user,
                id_school: user.id,
                gender: value === null || value === void 0 ? void 0 : value.gender,
            };
        }));
        const responseData = await this.studentService.createServiceArray(mapingData);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async getUser(query, request) {
        var _a;
        const { user } = request;
        const { search } = query;
        const getUser = await this.userRepository.findOne({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            attributes: ['id_school'],
        });
        const where = {
            id_school: (_a = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _a === void 0 ? void 0 : _a.id_school,
        };
        if (search) {
            where.full_name = {
                [sequelize_1.Op.like]: `%${search}%`,
            };
        }
        const responseData = await this.studentService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body, request) {
        const { user } = request;
        const responseData = await this.studentService.createService(Object.assign(Object.assign({}, body), { id_school: user === null || user === void 0 ? void 0 : user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async update(body, request) {
        const { user } = request;
        const responseData = await this.studentService.updateServiceAdmin(Object.assign(Object.assign({}, body), { id_school: user === null || user === void 0 ? void 0 : user.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async getStudentSpreadsheet() {
        const res = await this.studentService.getSpreadsheet();
        return (0, respone_1.default)({
            data: res,
        });
    }
    async updateUser(body, request) {
        var _a, _b;
        const { user } = request;
        const getUser = await this.userRepository.findOne({
            where: {
                id: user.id,
            },
            attributes: ['id', 'email'],
        });
        const getIdStudent = await this.studentRepository.findOne({
            where: {
                email_user: (_a = getUser.dataValues) === null || _a === void 0 ? void 0 : _a.email,
            },
            attributes: ['id'],
        });
        const responseData = await this.studentService.updateServiceAdmin(Object.assign(Object.assign({}, body), { id: (_b = getIdStudent.dataValues) === null || _b === void 0 ? void 0 : _b.id }));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.studentService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detail(param, request) {
        var _a, _b, _c, _d, _e, _f;
        const { user } = request;
        const responseData = await this.studentService.detailService({
            where: {
                id: param.id,
            },
            attributes: ['id', 'full_name', 'no', 'date_of_birth', 'photo'],
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
                            include: {
                                model: user_entity_1.UserEntity,
                                attributes: ['name'],
                                as: 'waliKelas',
                            },
                        },
                    ],
                },
            ],
        });
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
        const { date_of_birth, full_name, userClass, no, photo } = (responseData === null || responseData === void 0 ? void 0 : responseData.dataValues) || {};
        return (0, respone_1.default)({
            data: {
                full_name: full_name,
                no,
                photo,
                date_of_birth,
                classStudent: {
                    name: (_a = userClass === null || userClass === void 0 ? void 0 : userClass.masterClass) === null || _a === void 0 ? void 0 : _a.name,
                    id: (_b = userClass === null || userClass === void 0 ? void 0 : userClass.masterClass) === null || _b === void 0 ? void 0 : _b.id,
                    waliKelas: (_d = (_c = userClass === null || userClass === void 0 ? void 0 : userClass.masterClass) === null || _c === void 0 ? void 0 : _c.waliKelas) === null || _d === void 0 ? void 0 : _d.name,
                },
                levelTahfidz: (_f = (_e = lastSetoran === null || lastSetoran === void 0 ? void 0 : lastSetoran.dataValues) === null || _e === void 0 ? void 0 : _e.guideTahfidz) === null || _f === void 0 ? void 0 : _f.levelTahfidz,
            },
        });
    }
    async detailAdmin(param) {
        var _a, _b, _c;
        const responseData = await this.studentService.detailService({
            where: {
                id: param.id,
            },
            attributes: [
                'id',
                'full_name',
                'photo',
                'no',
                'date_of_birth',
                'gender',
                'email_user',
                'id_school',
                'id_user',
                'id_user_class',
            ],
            include: [
                {
                    model: user_class_entity_1.UserClassEntity,
                    attributes: ['id_master_class'],
                    as: 'userClass',
                },
            ],
        });
        return (0, respone_1.default)({
            data: Object.assign(Object.assign({}, responseData === null || responseData === void 0 ? void 0 : responseData.dataValues), { id_master_class: (_c = (_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.dataValues) === null || _a === void 0 ? void 0 : _a.userClass) === null || _b === void 0 ? void 0 : _b.dataValues) === null || _c === void 0 ? void 0 : _c.id_master_class }),
        });
    }
};
__decorate([
    (0, common_1.Get)('/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/admin/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.master_admin),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAdmin", null);
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
], StudentController.prototype, "createArray", null);
__decorate([
    (0, common_1.Get)('/ustadz/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getUser", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/admin/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ParamUpdate, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Get)('/admin/spreadsheet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentSpreadsheet", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    (0, common_1.Post)('/user/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ParamUpdate, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.user),
    (0, common_1.Get)('/user/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "detail", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.master_admin),
    (0, common_1.Get)('/admin/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "detailAdmin", null);
StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.user_setoran_provider.provide)),
    __param(3, (0, common_1.Inject)(master_provider_model_1.master_class_provider.provide)),
    __param(4, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(5, (0, common_1.Inject)(master_provider_model_1.achievement_provider.provide)),
    __metadata("design:paramtypes", [student_service_1.StudentService, Object, Object, Object, Object, Object])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map