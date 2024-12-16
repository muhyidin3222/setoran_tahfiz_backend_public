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
exports.GuideTahfidzService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let GuideTahfidzService = class GuideTahfidzService {
    constructor(guideTahfidzRepository) {
        this.guideTahfidzRepository = guideTahfidzRepository;
    }
    async detailService(param) {
        const resFindSeller = await this.guideTahfidzRepository.findOne(param);
        return resFindSeller;
    }
    async getService(query) {
        const resFindSeller = await this.guideTahfidzRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'name', 'description', 'no', 'id_level_tahfidz'], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async getServiceLastTahfidz(query) {
        const resFindSeller = await this.guideTahfidzRepository.findAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'description', 'name', 'no'], order: [['no', 'ASC']] }));
        return resFindSeller;
    }
    async deleteService(id) {
        const resFindSeller = await this.guideTahfidzRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSeller;
    }
    async updateService(body) {
        await this.guideTahfidzRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        const resFindSeller = await this.guideTahfidzRepository.create(body);
        return resFindSeller;
    }
    async createServiceArray(body) {
        const resData = await Promise.all(body === null || body === void 0 ? void 0 : body.map(async (val) => {
            await this.guideTahfidzRepository.findOrCreate({
                where: val,
                defaults: val,
            });
        }));
        return resData;
    }
};
GuideTahfidzService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.guide_tahfidz_provider.provide)),
    __metadata("design:paramtypes", [Object])
], GuideTahfidzService);
exports.GuideTahfidzService = GuideTahfidzService;
//# sourceMappingURL=guide-tahfidz.service.js.map