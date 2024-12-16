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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamValidationWaDto = exports.ParamSendWaDto = exports.ParamAuthSignupDto = exports.ParamAuthSellerDto = exports.ParamAuthDaftarDto = exports.ParamAuthVerifyDto = exports.ParamAuthGoogleDto = exports.ParamAuthDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
class ParamAuthDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ParamAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamAuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthDto.prototype, "type_auth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthDto.prototype, "fcm_token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthDto.prototype, "version", void 0);
exports.ParamAuthDto = ParamAuthDto;
class ParamAuthGoogleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "token_app", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "type_login", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "app_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "fcm_token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamAuthGoogleDto.prototype, "version", void 0);
exports.ParamAuthGoogleDto = ParamAuthGoogleDto;
class ParamAuthVerifyDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ParamAuthVerifyDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamAuthVerifyDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ParamAuthVerifyDto.prototype, "hashOtp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(4),
    __metadata("design:type", String)
], ParamAuthVerifyDto.prototype, "otp", void 0);
exports.ParamAuthVerifyDto = ParamAuthVerifyDto;
class ParamAuthDaftarDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "id_school", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "id_student", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "type_user", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ParamAuthDaftarDto.prototype, "id_user", void 0);
exports.ParamAuthDaftarDto = ParamAuthDaftarDto;
class ParamAuthSellerDto extends ParamAuthDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamAuthSellerDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], ParamAuthSellerDto.prototype, "phone", void 0);
exports.ParamAuthSellerDto = ParamAuthSellerDto;
class ParamAuthSignupDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ParamAuthSignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamAuthSignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamAuthSignupDto.prototype, "username", void 0);
exports.ParamAuthSignupDto = ParamAuthSignupDto;
class ParamSendWaDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamSendWaDto.prototype, "mobile_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, common_1.Optional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamSendWaDto.prototype, "typeSend", void 0);
exports.ParamSendWaDto = ParamSendWaDto;
class ParamValidationWaDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ParamValidationWaDto.prototype, "mobile_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", Number)
], ParamValidationWaDto.prototype, "otp", void 0);
exports.ParamValidationWaDto = ParamValidationWaDto;
//# sourceMappingURL=auth.dto.js.map