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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetoranTahfidzService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
const student_entity_1 = require("../student/student.entity");
const user_entity_1 = require("../user/user.entity");
const notification_service_1 = require("../notification/notification.service");
const uuid_1 = require("uuid");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const config_service_1 = require("../common/library/config.service");
let SetoranTahfidzService = class SetoranTahfidzService {
    constructor(userSetoranRepository, studentRepository, guideTahfidzRepository, achievementRepository, levelTahfidzRepository, userRepository, notificationService, configService) {
        this.userSetoranRepository = userSetoranRepository;
        this.studentRepository = studentRepository;
        this.guideTahfidzRepository = guideTahfidzRepository;
        this.achievementRepository = achievementRepository;
        this.levelTahfidzRepository = levelTahfidzRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.configService = configService;
    }
    async detailService(param) {
        const resFindSetoran = await this.userSetoranRepository.findOne(Object.assign(Object.assign({}, param), { attributes: [
                'id',
                'nilai',
                'incorrect',
                'sound',
                'message',
                'image',
                'created_at',
                'id_user',
            ], order: [['created_at', 'DESC']], include: [
                {
                    model: student_entity_1.StudentEntity,
                    as: 'studentMeyimak',
                    attributes: ['id', 'full_name', 'photo'],
                },
                {
                    model: user_entity_1.UserEntity,
                    as: 'userMeyimak',
                    attributes: ['id', 'name', 'photo', 'type_user'],
                    required: false,
                },
                {
                    model: guide_tahfidz_entity_1.GuideTahfidzEntity,
                    as: 'guideTahfidz',
                    attributes: ['id', 'name', 'description', 'no'],
                    required: true,
                },
                {
                    model: student_entity_1.StudentEntity,
                    as: 'student',
                    attributes: ['id', 'full_name', 'photo'],
                    required: true,
                },
            ] }));
        return resFindSetoran;
    }
    async getService(query) {
        const resFindSetoran = await this.userSetoranRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'nilai', 'image', 'message', 'incorrect', 'created_at'], order: [['created_at', 'DESC']], include: [
                {
                    model: student_entity_1.StudentEntity,
                    as: 'studentMeyimak',
                    attributes: ['id', 'full_name'],
                },
                {
                    model: user_entity_1.UserEntity,
                    as: 'userMeyimak',
                    attributes: ['id', 'name', 'photo', 'type_user'],
                    required: false,
                },
                {
                    model: guide_tahfidz_entity_1.GuideTahfidzEntity,
                    as: 'guideTahfidz',
                    attributes: ['id', 'name', 'no', 'description'],
                    required: true,
                },
                {
                    model: student_entity_1.StudentEntity,
                    as: 'student',
                    attributes: ['id', 'full_name', 'photo'],
                },
                {
                    model: level_tahfidz_entity_1.LevelTahfidzEntity,
                    as: 'levelTahfidz',
                    attributes: ['id', 'name'],
                },
            ] }));
        return resFindSetoran;
    }
    async deleteService(id) {
        const resFindSetoran = await this.userSetoranRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSetoran;
    }
    async updateService(body) {
        await this.userSetoranRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        const resCreated = await this.userSetoranRepository.create(body);
        return resCreated;
    }
    async createSetoranTahfidz(body) {
        var _a;
        const getUserStudent = await this.studentRepository.findOne({
            where: {
                id: body === null || body === void 0 ? void 0 : body.id_student,
            },
            attributes: ['email_user', 'id_user'],
        });
        let getUser = {};
        const { id_user, email_user } = (getUserStudent === null || getUserStudent === void 0 ? void 0 : getUserStudent.dataValues) || {};
        if (id_user) {
            body.id_user = id_user;
        }
        else {
            if (email_user) {
                const where = {};
                where.email = email_user;
                getUser = await this.userRepository.findOne({
                    where: where,
                    attributes: ['id'],
                });
                const { id } = (getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) || {};
                if (id) {
                    body.id_user = id;
                }
            }
        }
        const guideTahfidz = await this.guideTahfidzRepository.findOne({
            where: {
                id: body === null || body === void 0 ? void 0 : body.id_guide_tahfidz,
            },
            attributes: ['name', 'no', 'id_level_tahfidz'],
        });
        if (!body.id_level_tahfidz) {
            body.id_level_tahfidz = guideTahfidz.id_level_tahfidz;
        }
        const resCreated = await this.userSetoranRepository.create(body);
        let getStudent = {};
        if (body === null || body === void 0 ? void 0 : body.id_student) {
            getStudent = await this.studentRepository.findOne({
                where: {
                    id: body === null || body === void 0 ? void 0 : body.id_student,
                },
                attributes: ['id', 'full_name', 'id_school'],
            });
        }
        const { full_name } = (getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues) || {};
        const { name, no } = (guideTahfidz === null || guideTahfidz === void 0 ? void 0 : guideTahfidz.dataValues) || {};
        await this.createSertifikat({
            id_student: body === null || body === void 0 ? void 0 : body.id_student,
            id_level_tahfidz: body.id_level_tahfidz,
            id_user: id_user,
            noLevelTahfidz: no,
            id_school: getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues.id_school,
            full_name: getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues.full_name,
        });
        await this.notificationService.createNotifOneService({
            title: `${full_name || 'Siswa'} Baru Saja Meyetorkan`,
            id_user: id_user,
            type: 'setoran',
            description: full_name
                ? `${full_name} telah meyetorkan ${name}`
                : `Siswa telah meyetorkan ${name}, check aplikasi`,
            id_setoran: (_a = resCreated === null || resCreated === void 0 ? void 0 : resCreated.dataValues) === null || _a === void 0 ? void 0 : _a.id,
        });
        return resCreated;
    }
    async createSertifikat({ id_student, id_level_tahfidz, id_user, noLevelTahfidz, id_school, full_name }) {
        var _a, _b, _c;
        console.log('create sertifikat');
        const checkAchievement = await this.achievementRepository.count({
            where: {
                id_student,
                id_level_tahfidz,
            },
        });
        console.log(checkAchievement);
        if (!checkAchievement) {
            console.log('belum dibuat sertifikat');
            const noTahfidz = await this.guideTahfidzRepository.findOne({
                where: {
                    id_level_tahfidz,
                },
                attributes: ["no"],
                order: [['no', 'DESC']],
            });
            console.log({ noLevelTahfidz: (_a = noTahfidz === null || noTahfidz === void 0 ? void 0 : noTahfidz.dataValues) === null || _a === void 0 ? void 0 : _a.no, noLevelMurid: noLevelTahfidz });
            if (((_b = noTahfidz === null || noTahfidz === void 0 ? void 0 : noTahfidz.dataValues) === null || _b === void 0 ? void 0 : _b.no) === noLevelTahfidz) {
                console.log('setoran sudah selesai');
                const URL_API = await this.configService.get('URL_API');
                const levelTahfidz = await this.levelTahfidzRepository.findOne({
                    where: {
                        id: id_level_tahfidz,
                    },
                    attributes: ['name'],
                });
                const uuid = (0, uuid_1.v4)();
                const createAchievement = await this.achievementRepository.create({
                    id_student: id_student,
                    uuid: uuid,
                    id_level_tahfidz,
                    id_school: id_school,
                    name: `Sertifikat ${levelTahfidz === null || levelTahfidz === void 0 ? void 0 : levelTahfidz.name}`,
                    image_achievement: `${URL_API}/achievement/sertifikat/${uuid}`,
                });
                await this.notificationService.createNotifOneService({
                    title: `Sertifikat ${levelTahfidz === null || levelTahfidz === void 0 ? void 0 : levelTahfidz.name} buat ${full_name || 'Siswa'}`,
                    id_user: id_user,
                    type: 'sertifikat',
                    description: (full_name === null || full_name === void 0 ? void 0 : full_name.length)
                        ? `${full_name} telah mendapatkan sertifikat`
                        : `Siswa telah mendapatkan sertifikat, check aplikasi`,
                    id_sertifikat: (_c = createAchievement === null || createAchievement === void 0 ? void 0 : createAchievement.dataValues) === null || _c === void 0 ? void 0 : _c.id,
                });
                console.log('sertifikat dibuat');
            }
        }
    }
};
SetoranTahfidzService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.user_setoran_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.guide_tahfidz_provider.provide)),
    __param(3, (0, common_1.Inject)(master_provider_model_1.achievement_provider.provide)),
    __param(4, (0, common_1.Inject)(master_provider_model_1.level_tahfidz_provider.provide)),
    __param(5, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, notification_service_1.NotificationService,
        config_service_1.ConfigService])
], SetoranTahfidzService);
exports.SetoranTahfidzService = SetoranTahfidzService;
//# sourceMappingURL=setoran-tahfidz.service.js.map