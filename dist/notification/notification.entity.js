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
exports.NotificationEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const berita_entity_1 = require("../berita/berita.entity");
const user_setoran_entity_1 = require("../setoran-tahfidz/user-setoran.entity");
const user_entity_1 = require("../user/user.entity");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let NotificationEntity = class NotificationEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING,
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING(50),
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "screen", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id_berita", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id_setoran", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id_sertifikat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id_user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        onUpdate: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: 'TIMESTAMP',
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => berita_entity_1.BeritaEntity, {
        targetKey: 'id',
        foreignKey: 'id_berita',
    }),
    __metadata("design:type", berita_entity_1.BeritaEntity)
], NotificationEntity.prototype, "berita", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_setoran_entity_1.UserSetoranEntity, {
        targetKey: 'id',
        foreignKey: 'id_setoran',
    }),
    __metadata("design:type", user_setoran_entity_1.UserSetoranEntity)
], NotificationEntity.prototype, "userSetoran", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, {
        targetKey: 'id',
        foreignKey: 'id_user',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], NotificationEntity.prototype, "user", void 0);
NotificationEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'notification',
    })
], NotificationEntity);
exports.NotificationEntity = NotificationEntity;
//# sourceMappingURL=notification.entity.js.map