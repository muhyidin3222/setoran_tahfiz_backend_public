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
exports.UserSetoranEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const student_entity_1 = require("../student/student.entity");
const user_entity_1 = require("../user/user.entity");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let UserSetoranEntity = class UserSetoranEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id_student", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id_user_menyimak", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id_user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id_student_menyimak", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "incorrect", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "nilai", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id_guide_tahfidz", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], UserSetoranEntity.prototype, "id_level_tahfidz", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], UserSetoranEntity.prototype, "sound", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], UserSetoranEntity.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], UserSetoranEntity.prototype, "note", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], UserSetoranEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        onUpdate: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], UserSetoranEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: 'TIMESTAMP',
    }),
    __metadata("design:type", String)
], UserSetoranEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.StudentEntity, {
        targetKey: 'id',
        foreignKey: 'id_student_menyimak',
    }),
    __metadata("design:type", student_entity_1.StudentEntity)
], UserSetoranEntity.prototype, "studentMeyimak", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.StudentEntity, {
        targetKey: 'id',
        foreignKey: 'id_student',
    }),
    __metadata("design:type", student_entity_1.StudentEntity)
], UserSetoranEntity.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, {
        targetKey: 'id',
        foreignKey: 'id_user_menyimak',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserSetoranEntity.prototype, "userMeyimak", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, {
        targetKey: 'id',
        foreignKey: 'id_user',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserSetoranEntity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => guide_tahfidz_entity_1.GuideTahfidzEntity, {
        targetKey: 'id',
        foreignKey: 'id_guide_tahfidz',
    }),
    __metadata("design:type", guide_tahfidz_entity_1.GuideTahfidzEntity)
], UserSetoranEntity.prototype, "guideTahfidz", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => level_tahfidz_entity_1.LevelTahfidzEntity, {
        targetKey: 'id',
        foreignKey: 'id_level_tahfidz',
    }),
    __metadata("design:type", level_tahfidz_entity_1.LevelTahfidzEntity)
], UserSetoranEntity.prototype, "levelTahfidz", void 0);
UserSetoranEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_setoran',
    })
], UserSetoranEntity);
exports.UserSetoranEntity = UserSetoranEntity;
//# sourceMappingURL=user-setoran.entity.js.map