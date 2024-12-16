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
exports.AchievementEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const student_entity_1 = require("../student/student.entity");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let AchievementEntity = class AchievementEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], AchievementEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING,
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "image_achievement", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "link_report", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "link_vidio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], AchievementEntity.prototype, "id_school", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], AchievementEntity.prototype, "id_student", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], AchievementEntity.prototype, "id_level_tahfidz", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        onUpdate: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: 'TIMESTAMP',
    }),
    __metadata("design:type", String)
], AchievementEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.StudentEntity, {
        targetKey: 'id',
        foreignKey: 'id_student',
    }),
    __metadata("design:type", student_entity_1.StudentEntity)
], AchievementEntity.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => level_tahfidz_entity_1.LevelTahfidzEntity, {
        targetKey: 'id',
        foreignKey: 'id_level_tahfidz',
    }),
    __metadata("design:type", level_tahfidz_entity_1.LevelTahfidzEntity)
], AchievementEntity.prototype, "levelTahfidz", void 0);
AchievementEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'achievement',
    })
], AchievementEntity);
exports.AchievementEntity = AchievementEntity;
//# sourceMappingURL=achievement.entity.js.map