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
exports.ParamTopicDto = exports.ParamCodeReferalDto = exports.ParamEmailDto = void 0;
const class_validator_1 = require("class-validator");
class ParamEmailDto {
}
__decorate([
    (0, class_validator_1.MaxLength)(300),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamEmailDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ParamEmailDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamEmailDto.prototype, "note", void 0);
exports.ParamEmailDto = ParamEmailDto;
class ParamCodeReferalDto {
}
__decorate([
    (0, class_validator_1.MaxLength)(6),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamCodeReferalDto.prototype, "referal_code", void 0);
exports.ParamCodeReferalDto = ParamCodeReferalDto;
class ParamTopicDto {
}
__decorate([
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamTopicDto.prototype, "token", void 0);
exports.ParamTopicDto = ParamTopicDto;
//# sourceMappingURL=app.dto.js.map