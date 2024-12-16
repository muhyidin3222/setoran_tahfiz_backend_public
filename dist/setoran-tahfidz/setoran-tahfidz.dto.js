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
exports.ParamDelete = exports.ParamUpdate = exports.ParamCreate = exports.ParamUstadzGet = exports.ParamAdminGet = exports.ParamGet = void 0;
const class_validator_1 = require("class-validator");
const master_dto_1 = require("../common/dto/master.dto");
class dataSetoranTahfidz {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], dataSetoranTahfidz.prototype, "id_student", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], dataSetoranTahfidz.prototype, "id_student_menyimak", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], dataSetoranTahfidz.prototype, "incorrect", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], dataSetoranTahfidz.prototype, "nilai", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], dataSetoranTahfidz.prototype, "id_guide_tahfidz", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataSetoranTahfidz.prototype, "sound", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataSetoranTahfidz.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataSetoranTahfidz.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], dataSetoranTahfidz.prototype, "id_level_tahfidz", void 0);
class ParamGet extends master_dto_1.GetParamMasterDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamGet.prototype, "id_tag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamGet.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamGet.prototype, "id_student", void 0);
exports.ParamGet = ParamGet;
class ParamAdminGet {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamAdminGet.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamAdminGet.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamAdminGet.prototype, "id_tag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamAdminGet.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamAdminGet.prototype, "id_student", void 0);
exports.ParamAdminGet = ParamAdminGet;
class ParamUstadzGet extends master_dto_1.GetParamMasterDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamUstadzGet.prototype, "id_user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamUstadzGet.prototype, "type", void 0);
exports.ParamUstadzGet = ParamUstadzGet;
class ParamCreate extends dataSetoranTahfidz {
}
exports.ParamCreate = ParamCreate;
class ParamUpdate extends dataSetoranTahfidz {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ParamUpdate.prototype, "id", void 0);
exports.ParamUpdate = ParamUpdate;
class ParamDelete extends master_dto_1.UpdateParamMasterDto {
}
exports.ParamDelete = ParamDelete;
//# sourceMappingURL=setoran-tahfidz.dto.js.map