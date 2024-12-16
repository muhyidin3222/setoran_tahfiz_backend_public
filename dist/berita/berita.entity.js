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
exports.BeritaEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const tag_entity_1 = require("../tag/tag.entity");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let BeritaEntity = class BeritaEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], BeritaEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING,
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING(5000),
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], BeritaEntity.prototype, "top", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], BeritaEntity.prototype, "id_school", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], BeritaEntity.prototype, "id_tag", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        onUpdate: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: 'TIMESTAMP',
    }),
    __metadata("design:type", String)
], BeritaEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => tag_entity_1.TagEntity, {
        targetKey: 'id',
        foreignKey: 'id_tag',
    }),
    __metadata("design:type", tag_entity_1.TagEntity)
], BeritaEntity.prototype, "tag", void 0);
BeritaEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'berita',
    })
], BeritaEntity);
exports.BeritaEntity = BeritaEntity;
//# sourceMappingURL=berita.entity.js.map