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
exports.UserParamDelete = exports.UserParamUpdate = exports.UserParamCreate = exports.UserParamGet = exports.MasterParamDelete = exports.MasterParamUpdate = exports.MasterParamCreate = exports.MasterParamGet = void 0;
const class_validator_1 = require("class-validator");
const master_dto_1 = require("../common/dto/master.dto");
class masterClass {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], masterClass.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], masterClass.prototype, "total_student", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], masterClass.prototype, "school_year_start", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], masterClass.prototype, "school_year_end", void 0);
class MasterParamGet {
}
__decorate([
    (0, class_validator_1.MaxLength)(2),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MasterParamGet.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(2),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MasterParamGet.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MasterParamGet.prototype, "id_tag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MasterParamGet.prototype, "type", void 0);
exports.MasterParamGet = MasterParamGet;
class MasterParamCreate extends masterClass {
}
exports.MasterParamCreate = MasterParamCreate;
class MasterParamUpdate extends masterClass {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MasterParamUpdate.prototype, "id", void 0);
exports.MasterParamUpdate = MasterParamUpdate;
class MasterParamDelete extends master_dto_1.UpdateParamMasterDto {
}
exports.MasterParamDelete = MasterParamDelete;
class userDataCourses {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userDataCourses.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userDataCourses.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userDataCourses.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userDataCourses.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], userDataCourses.prototype, "id_tag", void 0);
class UserParamGet extends master_dto_1.GetParamMasterDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserParamGet.prototype, "id_tag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserParamGet.prototype, "type", void 0);
exports.UserParamGet = UserParamGet;
class UserParamCreate extends userDataCourses {
}
exports.UserParamCreate = UserParamCreate;
class UserParamUpdate extends userDataCourses {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserParamUpdate.prototype, "id", void 0);
exports.UserParamUpdate = UserParamUpdate;
class UserParamDelete extends master_dto_1.UpdateParamMasterDto {
}
exports.UserParamDelete = UserParamDelete;
//# sourceMappingURL=class.dto.js.map