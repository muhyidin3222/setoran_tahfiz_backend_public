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
exports.SetoranTahfidzController = void 0;
const common_1 = require("@nestjs/common");
const setoran_tahfidz_service_1 = require("./setoran-tahfidz.service");
const respone_1 = __importDefault(require("../common/library/respone"));
const pagination_1 = require("../common/library/pagination");
const setoran_tahfidz_dto_1 = require("./setoran-tahfidz.dto");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_constants_1 = require("../auth/auth.constants");
const throttler_1 = require("@nestjs/throttler");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const student_entity_1 = require("../student/student.entity");
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
let SetoranTahfidzController = class SetoranTahfidzController {
    constructor(setoranTahfidzService, userRepository, studentRepository, userSetoranRepository) {
        this.setoranTahfidzService = setoranTahfidzService;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.userSetoranRepository = userSetoranRepository;
    }
    async get(query) {
        const where = {};
        const responseData = await this.setoranTahfidzService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getUser(query, request) {
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
        const where = {
            id_student: (_b = getIdStudent === null || getIdStudent === void 0 ? void 0 : getIdStudent.dataValues) === null || _b === void 0 ? void 0 : _b.id,
        };
        const responseData = await this.setoranTahfidzService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getUstadz(query, request) {
        var _a;
        const { user } = request;
        const getUser = await this.userRepository.findOne({
            where: {
                id: user.id,
                type_user: auth_constants_1.dataConstants.ustadz,
            },
            attributes: ['type_user'],
        });
        if (!((_a = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _a === void 0 ? void 0 : _a.type_user)) {
            throw new common_1.BadRequestException('not have access');
        }
        const where = {};
        if (query.type === 'by_ustadz') {
            where.id_user_menyimak = user.id;
        }
        if (query.type === 'by_user' && query.id_student) {
            where.id_student = query.id_student;
        }
        const responseData = await this.setoranTahfidzService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async getAdmin(query) {
        const where = {
            id_student: query.id_student,
        };
        const responseData = await this.setoranTahfidzService.getService(Object.assign(Object.assign({}, (0, pagination_1.pagination)(query)), { where }));
        return (0, respone_1.default)({
            total: responseData.count,
            data: responseData.rows,
        });
    }
    async create(body, request) {
        var _a;
        const { user } = request;
        const getUser = await this.userRepository.findOne({
            where: {
                id: user.id,
                type_user: auth_constants_1.dataConstants.ustadz,
            },
            attributes: ['type_user'],
        });
        if (((_a = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _a === void 0 ? void 0 : _a.type_user) !== auth_constants_1.dataConstants.ustadz) {
            throw new common_1.BadRequestException('not have access');
        }
        const responseData = await this.setoranTahfidzService.createSetoranTahfidz(Object.assign({ id_user_menyimak: user.id }, body));
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async createSertifikat(body) {
        console.log(body);
        const setoranTahfidzGetAll = await this.userSetoranRepository.findAll(Object.assign(Object.assign({}, (0, pagination_1.pagination)({ total: String(body.total), page: String(1) })), { where: {
                id_level_tahfidz: body.id_level_tahfidz,
            }, include: [
                {
                    model: guide_tahfidz_entity_1.GuideTahfidzEntity,
                    as: 'guideTahfidz',
                    where: {
                        no: body.no
                    },
                    attributes: ['id', 'no'],
                    required: true,
                },
                {
                    model: student_entity_1.StudentEntity,
                    as: 'student',
                    attributes: ['id', 'full_name', 'photo', 'id_school'],
                    required: true,
                },
            ], attributes: ['id_student', 'id_user', 'id'] }));
        await Promise.all(setoranTahfidzGetAll.map(async (value) => {
            const { id_student, id_user, id, student } = value.dataValues;
            console.log({ id_student, id_user, id });
            await this.setoranTahfidzService.createSertifikat({
                id_student,
                id_level_tahfidz: body.id_level_tahfidz,
                id_user,
                noLevelTahfidz: body.no,
                id_school: student.id_school,
                full_name: student.full_name,
            });
        }));
        return (0, respone_1.default)({
            data: 'responseData',
        });
    }
    async update(body) {
        const responseData = await this.setoranTahfidzService.updateService(body);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async delete(id) {
        const responseData = await this.setoranTahfidzService.deleteService(id);
        return (0, respone_1.default)({
            data: responseData,
        });
    }
    async detail(param) {
        const responseData = await this.setoranTahfidzService.detailService({
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
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.ustadz),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setoran_tahfidz_dto_1.ParamGet]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/user/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.ustadz, auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setoran_tahfidz_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/ustadz/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.ustadz, auth_constants_1.dataConstants.user),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setoran_tahfidz_dto_1.ParamGet, Object]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "getUstadz", null);
__decorate([
    (0, common_1.Get)('/admin/get'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.master_admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setoran_tahfidz_dto_1.ParamAdminGet]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "getAdmin", null);
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin, auth_constants_1.dataConstants.user),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setoran_tahfidz_dto_1.ParamCreate, Object]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/check-sertifikat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "createSertifikat", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setoran_tahfidz_dto_1.ParamUpdate]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(auth_constants_1.dataConstants.master_admin, auth_constants_1.dataConstants.admin),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/user/detail/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SetoranTahfidzController.prototype, "detail", null);
SetoranTahfidzController = __decorate([
    (0, common_1.Controller)('setoran-tahfidz'),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(3, (0, common_1.Inject)(master_provider_model_1.user_setoran_provider.provide)),
    __metadata("design:paramtypes", [setoran_tahfidz_service_1.SetoranTahfidzService, Object, Object, Object])
], SetoranTahfidzController);
exports.SetoranTahfidzController = SetoranTahfidzController;
//# sourceMappingURL=setoran-tahfidz.controller.js.map