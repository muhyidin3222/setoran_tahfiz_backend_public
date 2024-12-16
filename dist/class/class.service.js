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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let ClassService = class ClassService {
    constructor(masterSchoolRepository, userClassRepository) {
        this.masterSchoolRepository = masterSchoolRepository;
        this.userClassRepository = userClassRepository;
    }
    async detailMasterClassService(param) {
        const resFindSeller = await this.masterSchoolRepository.findOne(param);
        return resFindSeller;
    }
    async getMasterClassService(query) {
        const resFindSeller = await this.masterSchoolRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: [
                'id',
                'name',
                'total_student',
                'school_year_start',
                'school_year_end',
            ], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteMasterClassService(where) {
        const resFindSeller = await this.masterSchoolRepository.destroy({
            where: where,
        });
        return resFindSeller;
    }
    async updateMasterClassService(body) {
        await this.masterSchoolRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
                id_school: body === null || body === void 0 ? void 0 : body.id_school,
            },
        });
        return body;
    }
    async createMasterClassService(body) {
        const resCreated = await this.masterSchoolRepository.create(body);
        return resCreated;
    }
    async detailUserClassService(param) {
        const resFindSeller = await this.userClassRepository.findOne(param);
        return resFindSeller;
    }
    async getUserClassService(query) {
        const resFindSeller = await this.userClassRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'name', 'created_at'], order: [['created_at', 'DESC']] }));
        return resFindSeller;
    }
    async deleteUserClassService(id) {
        const resFindSeller = await this.userClassRepository.destroy({
            where: {
                id,
            },
        });
        return resFindSeller;
    }
    async updateUserClassService(body) {
        await this.userClassRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createUserClassService(body) {
        const resCreated = await this.userClassRepository.create(body);
        return resCreated;
    }
};
ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.master_class_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_class_provider.provide)),
    __metadata("design:paramtypes", [Object, Object])
], ClassService);
exports.ClassService = ClassService;
//# sourceMappingURL=class.service.js.map