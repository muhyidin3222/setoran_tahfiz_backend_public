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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const master_class_entity_1 = require("../class/master_class.entity");
const user_class_entity_1 = require("../class/user_class.entity");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const notification_service_1 = require("../notification/notification.service");
const spreadsheetsConnect_1 = require("../common/library/spreadsheetsConnect");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
let StudentService = class StudentService {
    constructor(studentRepository, userClassRepository, userRepository, notificationService, masterClassRepository) {
        this.studentRepository = studentRepository;
        this.userClassRepository = userClassRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.masterClassRepository = masterClassRepository;
    }
    async detailService(param) {
        const resFindStudent = await this.studentRepository.findOne(param);
        return resFindStudent;
    }
    async getService(query) {
        var _a;
        const resFindStudent = await this.studentRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'full_name', 'photo'], order: [['created_at', 'DESC']], include: [
                {
                    model: user_class_entity_1.UserClassEntity,
                    attributes: ['id'],
                    as: 'userClass',
                    include: {
                        model: master_class_entity_1.MasterClassEntity,
                        attributes: ['name'],
                        as: 'masterClass',
                    },
                },
                {
                    model: user_class_entity_1.UserClassEntity,
                    attributes: ['id'],
                    as: 'userClass',
                },
            ] }));
        const mapingData = await Promise.all((_a = resFindStudent === null || resFindStudent === void 0 ? void 0 : resFindStudent.rows) === null || _a === void 0 ? void 0 : _a.map(async (value) => {
            var _a, _b, _c, _d;
            return {
                id: value === null || value === void 0 ? void 0 : value.id,
                full_name: value === null || value === void 0 ? void 0 : value.full_name,
                photo: value === null || value === void 0 ? void 0 : value.photo,
                userClass: {
                    id: (_a = value === null || value === void 0 ? void 0 : value.userClass) === null || _a === void 0 ? void 0 : _a.id,
                    name: (_d = (_c = (_b = value === null || value === void 0 ? void 0 : value.userClass) === null || _b === void 0 ? void 0 : _b.masterClass) === null || _c === void 0 ? void 0 : _c.dataValues) === null || _d === void 0 ? void 0 : _d.name,
                },
            };
        }));
        return {
            rows: mapingData,
            count: resFindStudent.count,
        };
    }
    async getServiceAdmin(query) {
        const resFindStudent = await this.studentRepository.findAndCountAll(Object.assign(Object.assign({}, query), { attributes: ['id', 'full_name', 'photo', 'no', 'email_user'], order: [['created_at', 'DESC']] }));
        return resFindStudent;
    }
    async deleteService(id) {
        await this.studentRepository.update({ id_user_class: null }, {
            where: {
                id,
            },
        });
        await this.userClassRepository.destroy({
            where: {
                id_student: id,
            },
        });
        const resFindStudent = await this.studentRepository.destroy({
            where: {
                id,
            },
            force: true,
        });
        return resFindStudent;
    }
    async updateService(body) {
        await this.studentRepository.update(body, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async updateEmailUser(body) {
        var _a, _b, _c, _d, _e, _f, _g;
        const updateData = body;
        const userRes = await this.userRepository.findOne({
            where: {
                email: body === null || body === void 0 ? void 0 : body.email_user,
            },
            attributes: ['id', 'fcm_token'],
        });
        const checkStudnetUser = await this.studentRepository.findOne({
            where: {
                email_user: body === null || body === void 0 ? void 0 : body.email_user,
            },
            attributes: ['id', 'full_name'],
        });
        if ((_a = checkStudnetUser === null || checkStudnetUser === void 0 ? void 0 : checkStudnetUser.dataValues) === null || _a === void 0 ? void 0 : _a.id) {
            throw new common_1.BadRequestException(`${body === null || body === void 0 ? void 0 : body.email_user} sudah dipakai, check murid ${(_b = checkStudnetUser === null || checkStudnetUser === void 0 ? void 0 : checkStudnetUser.dataValues) === null || _b === void 0 ? void 0 : _b.full_name}`);
        }
        if ((_c = userRes === null || userRes === void 0 ? void 0 : userRes.dataValues) === null || _c === void 0 ? void 0 : _c.id) {
            await this.userRepository.update({
                id_school: body === null || body === void 0 ? void 0 : body.id_school,
                step_register: null,
            }, {
                where: {
                    id: (_d = userRes === null || userRes === void 0 ? void 0 : userRes.dataValues) === null || _d === void 0 ? void 0 : _d.id,
                },
            });
        }
        if ((_e = userRes === null || userRes === void 0 ? void 0 : userRes.dataValues) === null || _e === void 0 ? void 0 : _e.id) {
            updateData.id_user = (_f = userRes === null || userRes === void 0 ? void 0 : userRes.dataValues) === null || _f === void 0 ? void 0 : _f.id;
            await this.notificationService.createNotifOneService({
                title: 'Kamu Sekarang Bisa Akses App',
                description: 'Yuk, check setiap setoran anak ',
                id_user: (_g = userRes === null || userRes === void 0 ? void 0 : userRes.dataValues) === null || _g === void 0 ? void 0 : _g.id,
                type: 'acess_app',
            });
        }
        return updateData;
    }
    async updateServiceAdmin(body) {
        let updateData = body;
        let resUserClass;
        if (body === null || body === void 0 ? void 0 : body.email_user) {
            updateData = await this.updateEmailUser(body);
        }
        if (body === null || body === void 0 ? void 0 : body.id_master_class) {
            resUserClass = await this.userClassRepository.create({
                id_master_class: body === null || body === void 0 ? void 0 : body.id_master_class,
                id_student: body === null || body === void 0 ? void 0 : body.id,
            });
            updateData.id_user_class = resUserClass === null || resUserClass === void 0 ? void 0 : resUserClass.id;
        }
        await this.studentRepository.update(updateData, {
            where: {
                id: body === null || body === void 0 ? void 0 : body.id,
            },
        });
        return body;
    }
    async createService(body) {
        const createData = body;
        const dataCreated = await this.studentRepository.create(createData);
        const resCreated = dataCreated === null || dataCreated === void 0 ? void 0 : dataCreated.dataValues;
        if (body === null || body === void 0 ? void 0 : body.email_user) {
            await this.updateEmailUser(resCreated);
        }
        const resUserClass = await this.userClassRepository.create({
            id_student: resCreated.id,
            id_master_class: createData.id_master_class,
        });
        await this.studentRepository.update({
            id_user_class: resUserClass === null || resUserClass === void 0 ? void 0 : resUserClass.id,
        }, {
            where: {
                id: resCreated === null || resCreated === void 0 ? void 0 : resCreated.id,
            },
        });
        if (createData.id_user) {
            await this.userRepository.update({
                id_student: resCreated === null || resCreated === void 0 ? void 0 : resCreated.id,
            }, {
                where: {
                    id: createData.id_user,
                },
            });
        }
        return resCreated;
    }
    async createServiceArray(body) {
        const resData = await Promise.all(body === null || body === void 0 ? void 0 : body.map(async (val) => {
            var _a, _b, _c, _d, _e, _f;
            const { masterClass, full_name, no, email_user, gender, id_school } = val;
            const where = {
                full_name,
                no,
                id_school,
            };
            const findOrCreateStudent = await this.studentRepository.findOrCreate({
                where: where,
                defaults: Object.assign(Object.assign({}, where), { email_user,
                    gender }),
            });
            const whereUserClass = {
                id_student: (_b = (_a = findOrCreateStudent[0]) === null || _a === void 0 ? void 0 : _a.dataValues) === null || _b === void 0 ? void 0 : _b.id,
                id_master_class: masterClass === null || masterClass === void 0 ? void 0 : masterClass.id,
            };
            const dataUserClass = await this.userClassRepository.findOrCreate({
                where: whereUserClass,
                defaults: whereUserClass,
            });
            await this.studentRepository.update({
                id_user_class: (_d = (_c = dataUserClass[0]) === null || _c === void 0 ? void 0 : _c.dataValues) === null || _d === void 0 ? void 0 : _d.id,
            }, {
                where: {
                    id: (_f = (_e = findOrCreateStudent[0]) === null || _e === void 0 ? void 0 : _e.dataValues) === null || _f === void 0 ? void 0 : _f.id,
                },
            });
        }));
        return resData;
    }
    async getSpreadsheet() {
        const resData = await (0, spreadsheetsConnect_1.spreadsheetsConfig)();
        await Promise.all(resData === null || resData === void 0 ? void 0 : resData.map(async (val, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            if (index) {
                const [studentCreated, studnetCheck] = await this.studentRepository.findOrCreate({
                    where: {
                        id_school: 1,
                        [sequelize_1.Op.or]: ((_a = val[3]) === null || _a === void 0 ? void 0 : _a.trim())
                            ? [
                                {
                                    email_user: (_b = val[3]) === null || _b === void 0 ? void 0 : _b.trim(),
                                },
                                {
                                    full_name: (_c = val[1]) === null || _c === void 0 ? void 0 : _c.trim(),
                                },
                            ]
                            : [
                                {
                                    full_name: (_d = val[1]) === null || _d === void 0 ? void 0 : _d.trim(),
                                },
                            ],
                    },
                    defaults: {
                        no: (_e = val[0]) === null || _e === void 0 ? void 0 : _e.trim(),
                        full_name: (_f = val[1]) === null || _f === void 0 ? void 0 : _f.trim(),
                        email_user: ((_g = val[3]) === null || _g === void 0 ? void 0 : _g.trim()) || null,
                        parent: ((_h = val[4]) === null || _h === void 0 ? void 0 : _h.trim()) || null,
                    },
                });
                if (studnetCheck) {
                    const [masterClass] = await this.masterClassRepository.findOrCreate({
                        where: {
                            name: (_j = val[2]) === null || _j === void 0 ? void 0 : _j.trim(),
                        },
                        defaults: {
                            name: (_k = val[2]) === null || _k === void 0 ? void 0 : _k.trim(),
                            total_student: 30,
                            school_year_start: (0, moment_1.default)().format('YYYY-MM'),
                            school_year_end: (0, moment_1.default)().add(1, 'years').format('YYYY-MM'),
                            id_school: 1,
                        },
                    });
                    const [userClass, userClassCheck] = await this.userClassRepository.findOrCreate({
                        where: {
                            id_master_class: (_l = masterClass === null || masterClass === void 0 ? void 0 : masterClass.dataValues) === null || _l === void 0 ? void 0 : _l.id,
                            id_student: (_m = studentCreated === null || studentCreated === void 0 ? void 0 : studentCreated.dataValues) === null || _m === void 0 ? void 0 : _m.id,
                        },
                        defaults: {
                            id_master_class: (_o = masterClass === null || masterClass === void 0 ? void 0 : masterClass.dataValues) === null || _o === void 0 ? void 0 : _o.id,
                            id_student: (_p = studentCreated === null || studentCreated === void 0 ? void 0 : studentCreated.dataValues) === null || _p === void 0 ? void 0 : _p.id,
                        },
                    });
                    if (userClassCheck) {
                        await this.studentRepository.update({
                            id_user_class: (_q = userClass === null || userClass === void 0 ? void 0 : userClass.dataValues) === null || _q === void 0 ? void 0 : _q.id,
                        }, {
                            where: {
                                id: (_r = studentCreated === null || studentCreated === void 0 ? void 0 : studentCreated.dataValues) === null || _r === void 0 ? void 0 : _r.id,
                            },
                        });
                    }
                }
            }
        }));
        return resData;
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.student_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.user_class_provider.provide)),
    __param(2, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(4, (0, common_1.Inject)(master_provider_model_1.master_class_provider.provide)),
    __metadata("design:paramtypes", [Object, Object, Object, notification_service_1.NotificationService, Object])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map