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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const auth_constants_1 = require("./auth.constants");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
const validation_token_service_1 = require("../common/library/validation-token.service");
const create_last_id_service_1 = require("../common/library/create-last-id.service");
const user_service_1 = require("../user/user.service");
const crypto_1 = require("../common/library/crypto");
const email_1 = require("../common/library/email");
let AuthService = class AuthService {
    constructor(userRepository, adminRepository, jwtService, validationTokenApp, userService) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
        this.validationTokenApp = validationTokenApp;
        this.userService = userService;
    }
    async loginAdminService(userParamBody) {
        try {
            const { email, password, type_auth } = userParamBody;
            const dataResponse = await this.adminRepository.findOne({
                where: {
                    email,
                },
                attributes: ['id', 'email', 'password', 'id_school'],
            });
            const userData = dataResponse === null || dataResponse === void 0 ? void 0 : dataResponse.dataValues;
            const type_user = (dataResponse === null || dataResponse === void 0 ? void 0 : dataResponse.id_school)
                ? auth_constants_1.dataConstants.admin
                : auth_constants_1.dataConstants.master_admin;
            if (type_auth === 'signin') {
                if (!userData)
                    throw new common_1.BadRequestException('Email Not Found');
                const payload = {
                    id: userData.id,
                    email: userData.email,
                    type_user: type_user,
                };
                const isMatch = await bcryptjs_1.default.compareSync(password, userData.password);
                if (!isMatch)
                    throw new common_1.BadRequestException('Password Salah');
                const user_token = this.jwtService.sign(payload);
                return {
                    id: userData.id,
                    user_token,
                    email: userData.email,
                    type_admin: type_user,
                };
            }
            else {
                throw new common_1.BadRequestException('invalid type_auth');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                description: 'server terjadi masalah, tunggu beberapa saat lagi',
            });
        }
    }
    async loginGoogleService(userParamBody) {
        const { email, app_id, token_app, fcm_token, username, version, photo } = userParamBody;
        try {
            const resValidationTokenApp = await this.validationTokenApp.validateTokenGoogle(token_app);
            const subApp = resValidationTokenApp === null || resValidationTokenApp === void 0 ? void 0 : resValidationTokenApp.sub;
            if (subApp !== app_id)
                throw new common_1.BadRequestException('invalid token atau email');
            const defaults = {
                email,
                id_google: app_id,
                fcm_token: fcm_token,
                version: version,
                name: username,
                photo: photo,
                id_school: 1,
            };
            const [userCreated] = await this.userRepository.findOrCreate({
                where: {
                    id_google: app_id,
                },
                defaults,
                attributes: [
                    'email',
                    'id_google',
                    'fcm_token',
                    'version',
                    'name',
                    'photo',
                    'type_user',
                    'id',
                ],
            });
            const user = userCreated === null || userCreated === void 0 ? void 0 : userCreated.dataValues;
            let checkStatusLogin = {};
            if ((user === null || user === void 0 ? void 0 : user.type_user) !== 'ustadz')
                checkStatusLogin = await this.userService.checkStatusLogin(email);
            const payload = {
                id: user.id,
                sub: user.id,
                type_user: auth_constants_1.dataConstants.user,
            };
            const user_token = this.jwtService.sign(payload);
            await this.userRepository.update({
                token: user_token,
                fcm_token: fcm_token,
                version: version,
                type_user: (user === null || user === void 0 ? void 0 : user.type_user) ? user === null || user === void 0 ? void 0 : user.type_user : 'user',
            }, {
                where: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                },
            });
            return Object.assign(Object.assign(Object.assign({}, user), { id: user.id, user_token, email: user.email, type_user: (user === null || user === void 0 ? void 0 : user.type_user) ? user === null || user === void 0 ? void 0 : user.type_user : 'user' }), checkStatusLogin);
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'SequelizeAccessDeniedError')
                throw new common_1.BadRequestException('maaf server terjadi masalah, tunggu beberapa saat lagi');
            throw new common_1.BadRequestException(error);
        }
    }
    async daftarService(paraDaftar) {
        const { id, id_school, id_student, type_user, gender, phone, id_user } = paraDaftar;
        const resUser = await this.userRepository.count({
            where: {
                id,
            },
            attributes: ['id'],
        });
        if (resUser) {
            await this.userRepository.update({
                id_school,
                id_student,
                type_user,
                gender,
                phone,
                id_user,
            }, {
                where: {
                    id,
                },
            });
        }
        else {
            throw new common_1.BadRequestException('Login terlebih dahulu');
        }
        return paraDaftar;
    }
    async logoutService(id) {
        await this.userRepository.update({
            fcm_token: null,
            token: null,
        }, {
            where: {
                id: id,
            },
        });
        return {
            id: id,
            message: 'sukses response message',
        };
    }
    async loginService(userParamBody) {
        const { email, password, type_auth, fcm_token, version } = userParamBody;
        try {
            const dataResponse = await this.userRepository.findOne({
                where: {
                    email,
                },
                attributes: [
                    'id',
                    'email',
                    'password',
                    'fcm_token',
                    'version',
                    'name',
                    'photo',
                    'type_user',
                ],
            });
            const userData = dataResponse === null || dataResponse === void 0 ? void 0 : dataResponse.dataValues;
            if (type_auth === 'signup' && userData) {
                if (userData === null || userData === void 0 ? void 0 : userData.password)
                    throw new common_1.BadRequestException('Akun Sudah Pernah Registrasi');
            }
            if (type_auth === 'signup') {
                const otp = (Math.floor(Math.random() * 10000) + 10000)
                    .toString()
                    .substring(1);
                const hashOtp = await (0, crypto_1.cryptoEncrypt)({ otp, email });
                await this.sendOtp(email, otp);
                return {
                    hashOtp: hashOtp,
                    message: 'success registration',
                };
            }
            if (type_auth === 'signin') {
                if (!userData)
                    throw new common_1.BadRequestException('Email Not Found');
                const payload = {
                    id: userData.id,
                    sub: userData.id,
                    type_user: auth_constants_1.dataConstants.user,
                };
                const isMatch = await bcryptjs_1.default.compareSync(password, userData.password);
                if (!isMatch)
                    throw new common_1.BadRequestException('Password Salah');
                const user_token = this.jwtService.sign(payload);
                await this.userRepository.update({
                    fcm_token: fcm_token,
                    token: user_token,
                    version: version,
                }, {
                    where: {
                        id: userData === null || userData === void 0 ? void 0 : userData.id,
                    },
                });
                let checkStatusLogin;
                if ((userData === null || userData === void 0 ? void 0 : userData.type_user) === 'user')
                    checkStatusLogin = await this.userService.checkStatusLogin(email);
                return Object.assign({ id: userData.id, fcm_token: userData === null || userData === void 0 ? void 0 : userData.fcm_token, version: userData === null || userData === void 0 ? void 0 : userData.version, name: userData === null || userData === void 0 ? void 0 : userData.name, photo: userData === null || userData === void 0 ? void 0 : userData.photo, type_user: userData === null || userData === void 0 ? void 0 : userData.type_user, user_token, email: userData.email }, checkStatusLogin);
            }
            else {
                throw new common_1.BadRequestException('invalid type_auth');
            }
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'SequelizeAccessDeniedError')
                throw new common_1.BadRequestException('maaf server terjadi masalah, tunggu beberapa saat lagi');
            throw new common_1.BadRequestException(error);
        }
    }
    async sendOtp(email, otp) {
        const configEmail = {
            from: 'on_reply@supecourses.com',
            to: email,
            subject: 'OTP APP SETORAN TAHFIDZ',
            text: `
          <div>
          CODE OTP ANDA <a style="color:blue">${otp}</a>
          Jangan bagikan CODE OTP ini kepada siapapun
          <div>
          `,
        };
        await (0, email_1.sendEmail)(configEmail);
    }
    async createId() {
        var _a;
        const userFindOne = await this.userRepository.findOne({
            order: [['id', 'DESC']],
            attributes: ['id'],
        });
        const lastId = (_a = userFindOne === null || userFindOne === void 0 ? void 0 : userFindOne.dataValues) === null || _a === void 0 ? void 0 : _a.id;
        return (0, create_last_id_service_1.newId)(lastId, `USER-`);
    }
    async verificationOtp(dataVerification) {
        const { otp, hashOtp, password, email } = dataVerification;
        const resDecrypt = await (0, crypto_1.cryptoDecrypt)(hashOtp);
        if ((resDecrypt === null || resDecrypt === void 0 ? void 0 : resDecrypt.email) == email && otp == (resDecrypt === null || resDecrypt === void 0 ? void 0 : resDecrypt.otp)) {
            const genSalt = await bcryptjs_1.default.genSalt(10);
            const hashPassword = await bcryptjs_1.default.hash(password, genSalt);
            const [user, checkUser] = await this.userRepository.findOrCreate({
                where: {
                    email,
                },
                defaults: {
                    email,
                    password: hashPassword,
                    type_user: 'user',
                    id_school: 1,
                },
            });
            if (!checkUser) {
                await this.userRepository.update({
                    password: hashPassword,
                }, {
                    where: {
                        email: email,
                    },
                });
            }
            return {
                email,
                otp,
                message: 'silahkan login',
            };
        }
        else {
            throw new common_1.BadRequestException('Invalid Otp');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(master_provider_model_1.user_provider.provide)),
    __param(1, (0, common_1.Inject)(master_provider_model_1.admin_user_provider.provide)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        validation_token_service_1.ValidationTokenApp,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map