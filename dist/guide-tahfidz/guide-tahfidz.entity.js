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
exports.GuideTahfidzEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const school_entity_1 = require("../school/school.entity");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let GuideTahfidzEntity = class GuideTahfidzEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], GuideTahfidzEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING(100),
    }),
    __metadata("design:type", String)
], GuideTahfidzEntity.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], GuideTahfidzEntity.prototype, "no", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], GuideTahfidzEntity.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], GuideTahfidzEntity.prototype, "id_school", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], GuideTahfidzEntity.prototype, "id_level_tahfidz", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], GuideTahfidzEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        onUpdate: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], GuideTahfidzEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: 'TIMESTAMP',
    }),
    __metadata("design:type", String)
], GuideTahfidzEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => school_entity_1.SchoolEntity, {
        targetKey: 'id',
        foreignKey: 'id_school',
    }),
    __metadata("design:type", school_entity_1.SchoolEntity)
], GuideTahfidzEntity.prototype, "school", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => level_tahfidz_entity_1.LevelTahfidzEntity, {
        targetKey: 'id',
        foreignKey: 'id_level_tahfidz',
    }),
    __metadata("design:type", level_tahfidz_entity_1.LevelTahfidzEntity)
], GuideTahfidzEntity.prototype, "levelTahfidz", void 0);
GuideTahfidzEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'guide_tahfidz',
    })
], GuideTahfidzEntity);
exports.GuideTahfidzEntity = GuideTahfidzEntity;
//# sourceMappingURL=guide-tahfidz.entity.js.map