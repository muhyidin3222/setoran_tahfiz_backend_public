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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const firebase_1 = require("../common/library/firebase");
const student_entity_1 = require("../student/student.entity");
const lodash_1 = __importDefault(require("lodash"));
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
let AppService = class AppService {
    constructor(configRepository, userRepository, userSetoranRepository) {
        this.configRepository = configRepository;
        this.userRepository = userRepository;
        this.userSetoranRepository = userSetoranRepository;
    }
    main() {
        return 'success main api';
    }
    async home() {
        const resHome = await this.configRepository.findOne({
            attributes: ['version_android', 'version_ios'],
        });
        return resHome;
    }
    async subscribe(id) {
        const getUser = await this.userRepository.findOne({
            where: {
                id,
            },
            attributes: ['fcm_token', 'id_school'],
        });
        const { id_school, fcm_token } = (getUser === null || getUser === void 0 ? void 0 : getUser.dataValues) || {};
        if (id_school && (fcm_token === null || fcm_token === void 0 ? void 0 : fcm_token.length)) {
            try {
                await firebase_1.firebaseInit
                    .messaging()
                    .subscribeToTopic([fcm_token], `BERITA${id_school.toString()}`);
                await firebase_1.firebaseInit.messaging().subscribeToTopic([fcm_token], 'GLOBAL');
            }
            catch (error) {
            }
        }
        return;
    }
    async homeChart(id_school) {
        const resHome = await this.userSetoranRepository.findAndCountAll({
            attributes: ['id', 'id_student', 'incorrect', 'nilai'],
            include: [
                {
                    model: student_entity_1.StudentEntity,
                    as: 'student',
                    required: true,
                    where: {
                        id_school: id_school,
                    },
                    attributes: ['full_name'],
                },
                {
                    model: guide_tahfidz_entity_1.GuideTahfidzEntity,
                    as: 'guideTahfidz',
                    required: true,
                    attributes: ['name', 'description'],
                },
            ],
        });
        const resData = resHome.rows;
        const gruping = lodash_1.default.groupBy(resData, 'id_student');
        const countStudent = lodash_1.default.keys(gruping).map((value) => {
            var _a, _b, _c, _d, _e;
            return ({
                full_name: (_c = (_b = (_a = gruping[value][0]) === null || _a === void 0 ? void 0 : _a.dataValues) === null || _b === void 0 ? void 0 : _b.student) === null || _c === void 0 ? void 0 : _c.full_name,
                count: (_d = gruping[value]) === null || _d === void 0 ? void 0 : _d.length,
                dataSetoranTahfidz: (_e = gruping[value]) === null || _e === void 0 ? void 0 : _e.map((value) => {
                    var _a, _b, _c, _d;
                    return (Object.assign(Object.assign({}, (_b = (_a = value === null || value === void 0 ? void 0 : value.dataValues) === null || _a === void 0 ? void 0 : _a.guideTahfidz) === null || _b === void 0 ? void 0 : _b.dataValues), { incorrect: (_c = value === null || value === void 0 ? void 0 : value.dataValues) === null || _c === void 0 ? void 0 : _c.incorrect, nilai: (_d = value === null || value === void 0 ? void 0 : value.dataValues) === null || _d === void 0 ? void 0 : _d.nilai }));
                }),
            });
        });
        const sortBy = lodash_1.default.sortBy(countStudent, [(value) => value.count]);
        return {
            rows: sortBy.reverse(),
            count: resHome.count,
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.config_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.user_setoran_provider.provide)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map