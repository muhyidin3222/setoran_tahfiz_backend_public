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
exports.EntityMaster = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
class EntityMaster {
    createDates() {
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }
    updateDates() {
        this.updated_at = Date.now();
    }
}
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
        type: sequelize_1.INTEGER,
    }),
    __metadata("design:type", Number)
], EntityMaster.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
        type: sequelize_1.INTEGER,
    }),
    __metadata("design:type", Number)
], EntityMaster.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: sequelize_1.INTEGER,
    }),
    __metadata("design:type", Number)
], EntityMaster.prototype, "deleted_at", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntityMaster.prototype, "createDates", null);
__decorate([
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntityMaster.prototype, "updateDates", null);
exports.EntityMaster = EntityMaster;
//# sourceMappingURL=entity-master.js.map