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
exports.LevelTahfidzService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let LevelTahfidzService = class LevelTahfidzService {
    constructor(levelTahfidzRepository) {
        this.levelTahfidzRepository = levelTahfidzRepository;
    }
    async detailService(param) {
        const resFindSeller = await this.levelTahfidzRepository.findOne(param);
        return resFindSeller;
    }
    async getService(query) {
        const resFindSeller = await this.levelTahfidzRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'name'], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteService(where) {
        const resFindSeller = await this.levelTahfidzRepository.destroy({
            where: where,
        });
        return resFindSeller;
    }
    async updateService(body) {
        await this.levelTahfidzRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
                id_school: body === null || body === void 0 ? void 0 : body.id_school,
            },
        });
        return body;
    }
    async createService(body) {
        const resFindSeller = await this.levelTahfidzRepository.create(body);
        return resFindSeller;
    }
};
LevelTahfidzService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.level_tahfidz_provider.provide)),
    __metadata("design:paramtypes", [Object])
], LevelTahfidzService);
exports.LevelTahfidzService = LevelTahfidzService;
//# sourceMappingURL=level-tahfidz.service.js.map