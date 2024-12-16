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
exports.AchievementService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const notification_service_1 = require("../notification/notification.service");
const student_entity_1 = require("../student/student.entity");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
let AchievementService = class AchievementService {
    constructor(achievementRepository, studentRepository, notificationService, userRepository) {
        this.achievementRepository = achievementRepository;
        this.studentRepository = studentRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }
    async detailService(param) {
        const resFindSeller = await this.achievementRepository.findOne(param);
        return resFindSeller;
    }
    async getService(query) {
        const resFindSeller = await this.achievementRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: [
                'id',
                'name',
                'image_achievement',
                'link_report',
                'link_vidio',
                'created_at',
            ], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteService(id) {
        const resFindSeller = await this.achievementRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSeller;
    }
    async updateService(body) {
        await this.achievementRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        var _a, _b;
        const resAchievement = await this.achievementRepository.create(body);
        if (body === null || body === void 0 ? void 0 : body.id_student) {
            const getStudent = await this.studentRepository.findOne({
                where: {
                    id: body === null || body === void 0 ? void 0 : body.id_student,
                },
                attributes: ['id', 'full_name', 'email_user'],
            });
            const { email_user } = (getStudent === null || getStudent === void 0 ? void 0 : getStudent.dataValues) || {};
            const getUser = await this.userRepository.findOne({
                where: {
                    email: email_user,
                },
                attributes: ['id'],
            });
            if (email_user && ((_a = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _a === void 0 ? void 0 : _a.id)) {
                this.notificationService.createNotifOneService({
                    title: 'Selamat kamu dapat sertifikat, Yuk check lewat aplikasi',
                    id_user: (_b = getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) === null || _b === void 0 ? void 0 : _b.id,
                    type: 'sertifikat',
                    description: body === null || body === void 0 ? void 0 : body.name,
                    id_sertifikat: resAchievement.id,
                });
            }
        }
        return resAchievement;
    }
    async sertifikat(id) {
        const getDetail = await this.achievementRepository.findOne({
            where: {
                uuid: id,
            },
            attributes: ['uuid'],
            include: [
                {
                    model: student_entity_1.StudentEntity,
                    as: 'student',
                    attributes: ['id', 'full_name'],
                    required: true,
                },
                {
                    model: level_tahfidz_entity_1.LevelTahfidzEntity,
                    as: 'levelTahfidz',
                    attributes: ['id', 'sertifikat_url'],
                    required: true,
                },
            ],
        });
        if (!(getDetail === null || getDetail === void 0 ? void 0 : getDetail.student)) {
            throw new common_1.BadRequestException('not found');
        }
        const url_image = getDetail.levelTahfidz.sertifikat_url;
        const fileExt = url_image.split('.').pop();
        return {
            buffer: "resDownload.toBuffer()",
            type: "fileExt",
        };
    }
};
AchievementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.achievement_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(3, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [Object, Object, notification_service_1.NotificationService, Object])
], AchievementService);
exports.AchievementService = AchievementService;
//# sourceMappingURL=achievement.service.js.map