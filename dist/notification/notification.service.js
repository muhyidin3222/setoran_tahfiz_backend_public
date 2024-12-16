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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const firebase_1 = require("../common/library/firebase");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let NotificationService = class NotificationService {
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async detailService(param) {
        const resFindSeller = await this.notificationRepository.findOne(param);
        return resFindSeller;
    }
    async getService(query) {
        const resFindSeller = await this.notificationRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: [
                'id',
                'name',
                'id_setoran',
                'id_berita',
                'id_sertifikat',
                'screen',
                'description',
                'created_at',
            ], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteService(id) {
        const resFindSeller = await this.notificationRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSeller;
    }
    async updateService(body) {
        await this.notificationRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        const resFindSeller = await this.notificationRepository.create(body);
        return resFindSeller;
    }
    async createAllNotifService(body) {
        var _a;
        const getUser = await this.userRepository.findAll({
            where: {
                id_school: body === null || body === void 0 ? void 0 : body.id_school,
                token: {
                    [sequelize_1.Op.not]: null,
                },
                fcm_token: {
                    [sequelize_1.Op.not]: null,
                },
            },
            attributes: ['id'],
            order: [['created_at', 'DESC']],
        });
        const notifTitleData = (body === null || body === void 0 ? void 0 : body.type) === 'EVENT' ? 'Kabar Event' : 'Info Terbaru Dari Sekolah';
        const message = {
            data: {
                type: body === null || body === void 0 ? void 0 : body.type,
                id: ((_a = body === null || body === void 0 ? void 0 : body.id) === null || _a === void 0 ? void 0 : _a.toString()) || '',
            },
            notification: {
                title: notifTitleData,
                body: body === null || body === void 0 ? void 0 : body.title,
            },
        };
        const dataCreated = getUser.map((value) => {
            var _a;
            return {
                name: notifTitleData,
                description: body === null || body === void 0 ? void 0 : body.title,
                type: body === null || body === void 0 ? void 0 : body.type,
                id_user: (_a = value === null || value === void 0 ? void 0 : value.dataValues) === null || _a === void 0 ? void 0 : _a.id,
            };
        });
        await this.notificationRepository.bulkCreate(dataCreated, {
            individualHooks: true,
        });
        await firebase_1.firebaseInit
            .messaging()
            .sendToTopic(`${body === null || body === void 0 ? void 0 : body.type}${body === null || body === void 0 ? void 0 : body.id_school}`, message)
            .then((response) => console.log(JSON.stringify(response) + ' messages were sent successfully'))
            .catch((error) => {
            console.log(error);
        });
        return;
    }
    async createNotifOneService(body) {
        var _a;
        try {
            const { title, id_user, type, description, id_berita, id_setoran, id_sertifikat, } = body;
            const getUser = await this.userRepository.findOne({
                where: {
                    id: id_user,
                },
                attributes: ['id', 'fcm_token'],
                order: [['created_at', 'DESC']],
            });
            const message = {
                data: {
                    type: type,
                    id: (id_user === null || id_user === void 0 ? void 0 : id_user.toString()) || '',
                },
                notification: {
                    title: title,
                    body: description,
                },
                token: getUser === null || getUser === void 0 ? void 0 : getUser.fcm_token,
            };
            if ((_a = getUser === null || getUser === void 0 ? void 0 : getUser.fcm_token) === null || _a === void 0 ? void 0 : _a.length) {
                const resNotification = await this.notificationRepository.create({
                    name: title,
                    description: description,
                    type: type,
                    id_user: id_user,
                    id_berita,
                    id_setoran,
                    id_sertifikat,
                });
                await firebase_1.firebaseInit
                    .messaging()
                    .send(message)
                    .then((response) => console.log(JSON.stringify(response) + ' messages were sent successfully'));
                return resNotification;
            }
            return;
        }
        catch (error) {
            console.log('error', error);
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.notification_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __metadata("design:paramtypes", [Object, Object])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map