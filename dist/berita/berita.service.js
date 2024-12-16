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
exports.BeritaService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const notification_service_1 = require("../notification/notification.service");
let BeritaService = class BeritaService {
    constructor(beritaRepository, notificationService) {
        this.beritaRepository = beritaRepository;
        this.notificationService = notificationService;
    }
    async detailService(param) {
        const resFindSeller = await this.beritaRepository.findOne(param);
        return resFindSeller;
    }
    async getService(query) {
        const resFindSeller = await this.beritaRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'title', 'image', 'description', 'created_at'], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteService(where) {
        const resFindSeller = await this.beritaRepository.destroy({
            where: where,
        });
        return resFindSeller;
    }
    async updateService(body) {
        await this.beritaRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async updateAdminService(body, where) {
        await this.beritaRepository.update(body, {
            where: where,
        });
        return body;
    }
    async createService(body) {
        const resCreated = await this.beritaRepository.create(body);
        this.notificationService.createAllNotifService({
            type: 'BERITA',
            title: body.title,
            id: resCreated === null || resCreated === void 0 ? void 0 : resCreated.id,
            id_school: body.id_school,
        });
        return resCreated;
    }
};
BeritaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.berita_provider.provide)),
    __metadata("design:paramtypes", [Object, notification_service_1.NotificationService])
], BeritaService);
exports.BeritaService = BeritaService;
//# sourceMappingURL=berita.service.js.map