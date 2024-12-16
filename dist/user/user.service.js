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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const master_class_entity_1 = require("../class/master_class.entity");
const user_class_entity_1 = require("../class/user_class.entity");
const master_provider_model_1 = require("../common/provider/master-provider-model");
let UserService = class UserService {
    constructor(userRepository, adminRepository, studentRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
    }
    async detailService(param) {
        const resEntity = await this.userRepository.findOne(param);
        return resEntity;
    }
    async getService(query) {
        const resEntity = await this.userRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'name', 'email', 'phone', 'photo', 'type_user'], order: [['created_at', 'DESC']] }));
        return resEntity;
    }
    async getFindAll(query) {
        const resEntity = await this.userRepository.findAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'name', 'email', 'phone', 'photo'], order: [['created_at', 'DESC']] }));
        return resEntity;
    }
    async deleteService(id) {
        const resEntity = await this.userRepository.destroy({
            where: {
                id,
            },
        });
        return resEntity;
    }
    async updateService(body) {
        await this.userRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        const resEntity = await this.userRepository.create(body);
        return resEntity;
    }
    async detailAdminService(param) {
        const resEntity = await this.adminRepository.findOne(param);
        return resEntity;
    }
    async checkStatusLogin(email) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let step_register = null;
        const checkStudnet = await this.studentRepository.findOne({
            where: {
                email_user: email,
            },
            attributes: ['id', 'full_name', 'photo', 'id_school', 'id_user'],
            include: [
                {
                    model: user_class_entity_1.UserClassEntity,
                    required: false,
                    include: [
                        {
                            model: master_class_entity_1.MasterClassEntity,
                            attributes: ['name'],
                            required: false,
                        },
                    ],
                },
            ],
        });
        const userClass = {
            id_student: (_a = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _a === void 0 ? void 0 : _a.id,
            id_school: (_b = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _b === void 0 ? void 0 : _b.id_school,
            student: (_c = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _c === void 0 ? void 0 : _c.full_name,
            photo: (_d = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _d === void 0 ? void 0 : _d.photo,
            user_class: (_g = (_f = (_e = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _e === void 0 ? void 0 : _e.userClass) === null || _f === void 0 ? void 0 : _f.masterClass) === null || _g === void 0 ? void 0 : _g.name,
            id_class: (_k = (_j = (_h = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _h === void 0 ? void 0 : _h.userClass) === null || _j === void 0 ? void 0 : _j.masterClass) === null || _k === void 0 ? void 0 : _k.id,
        };
        const student = {
            id: (_l = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _l === void 0 ? void 0 : _l.id,
            full_name: (_m = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _m === void 0 ? void 0 : _m.full_name,
            photo: (_o = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _o === void 0 ? void 0 : _o.photo,
        };
        if (!checkStudnet) {
            step_register = 1;
        }
        else {
            if (!((_p = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _p === void 0 ? void 0 : _p.id_user)) {
                await this.studentRepository.update({
                    id_user: (_q = checkStudnet === null || checkStudnet === void 0 ? void 0 : checkStudnet.dataValues) === null || _q === void 0 ? void 0 : _q.id_user,
                }, {
                    where: {
                        email_user: email,
                    },
                });
            }
        }
        return {
            step_register,
            userClass,
            student,
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.admin_user_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map