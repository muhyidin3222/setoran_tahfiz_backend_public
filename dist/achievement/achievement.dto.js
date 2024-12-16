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
exports.ParamDelete = exports.ParamUpdate = exports.ParamCreate = exports.ParamGet = void 0;
const class_validator_1 = require("class-validator");
const master_dto_1 = require("../common/dto/master.dto");
class dataAchievement {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataAchievement.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataAchievement.prototype, "image_achievement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataAchievement.prototype, "link_report", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataAchievement.prototype, "link_vidio", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], dataAchievement.prototype, "id_student", void 0);
class ParamGet {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(2),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamGet.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(2),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamGet.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ParamGet.prototype, "id_student", void 0);
exports.ParamGet = ParamGet;
class ParamCreate extends dataAchievement {
}
exports.ParamCreate = ParamCreate;
class ParamUpdate extends dataAchievement {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ParamUpdate.prototype, "id", void 0);
exports.ParamUpdate = ParamUpdate;
class ParamDelete extends master_dto_1.UpdateParamMasterDto {
}
exports.ParamDelete = ParamDelete;
//# sourceMappingURL=achievement.dto.js.map