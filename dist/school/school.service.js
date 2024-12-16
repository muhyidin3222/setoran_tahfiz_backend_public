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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let SchoolService = class SchoolService {
    constructor(schoolRepository, periodRepository) {
        this.schoolRepository = schoolRepository;
        this.periodRepository = periodRepository;
    }
    async detailService(param) {
        const resFindSeller = await this.schoolRepository.findOne(param);
        return resFindSeller;
    }
    async getService(query) {
        const resFindSeller = await this.schoolRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'name'], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteService(id) {
        const resFindSeller = await this.schoolRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSeller;
    }
    async updateService(body) {
        await this.schoolRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        const resCreated = await this.schoolRepository.create(body);
        return resCreated;
    }
    async detailPeriodService(param) {
        const resFindSeller = await this.periodRepository.findOne(param);
        return resFindSeller;
    }
    async getPeriodService(query) {
        const resFindSeller = await this.periodRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'title', 'image', 'description', 'created_at'], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deletePeriodService(id) {
        const resFindSeller = await this.periodRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSeller;
    }
    async updatePeriodService(body) {
        await this.periodRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createPeriodService(body) {
        const resCreated = await this.periodRepository.create(body);
        return resCreated;
    }
};
SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.school_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.period_provider.provide)),
    __metadata("design:paramtypes", [Object, Object])
], SchoolService);
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map