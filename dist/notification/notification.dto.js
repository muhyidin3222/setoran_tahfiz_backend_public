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
class dataCourses {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataCourses.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataCourses.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataCourses.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataCourses.prototype, "id_berita", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataCourses.prototype, "id_event", void 0);
class ParamGet extends master_dto_1.GetParamMasterDto {
}
exports.ParamGet = ParamGet;
class ParamCreate extends dataCourses {
}
exports.ParamCreate = ParamCreate;
class ParamUpdate extends dataCourses {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ParamUpdate.prototype, "id", void 0);
exports.ParamUpdate = ParamUpdate;
class ParamDelete extends master_dto_1.UpdateParamMasterDto {
}
exports.ParamDelete = ParamDelete;
//# sourceMappingURL=notification.dto.js.map