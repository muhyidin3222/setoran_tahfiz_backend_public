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
exports.ConfigEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let ConfigEntity = class ConfigEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], ConfigEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "version_android", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "version_ios", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "visi", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "misi", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "banner1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "banner2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "banner3", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: STRING,
    }),
    __metadata("design:type", String)
], ConfigEntity.prototype, "deleted_at", void 0);
ConfigEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'config',
    })
], ConfigEntity);
exports.ConfigEntity = ConfigEntity;
//# sourceMappingURL=config.entity.js.map