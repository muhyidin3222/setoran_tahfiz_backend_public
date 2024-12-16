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
exports.ParamDelete = exports.ParamUpdateReview = exports.ParamUpdateAdmin = exports.ParamUpdate = exports.ParamCreate = exports.ParamGet = void 0;
const class_validator_1 = require("class-validator");
const master_dto_1 = require("../common/dto/master.dto");
class dataUser {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "about", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], dataUser.prototype, "version", void 0);
class ParamGet extends master_dto_1.GetParamMasterDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamGet.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamGet.prototype, "type_user", void 0);
exports.ParamGet = ParamGet;
class ParamCreate extends dataUser {
}
exports.ParamCreate = ParamCreate;
class ParamUpdate extends dataUser {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ParamUpdate.prototype, "id", void 0);
exports.ParamUpdate = ParamUpdate;
class ParamUpdateAdmin extends dataUser {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ParamUpdateAdmin.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamUpdateAdmin.prototype, "type_user", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamUpdateAdmin.prototype, "id_school", void 0);
exports.ParamUpdateAdmin = ParamUpdateAdmin;
class ParamUpdateReview {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamUpdateReview.prototype, "id_school", void 0);
exports.ParamUpdateReview = ParamUpdateReview;
class ParamDelete extends master_dto_1.UpdateParamMasterDto {
}
exports.ParamDelete = ParamDelete;
//# sourceMappingURL=user.dto.js.map