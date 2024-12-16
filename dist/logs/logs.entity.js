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
exports.LogsEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let LogsEntity = class LogsEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], LogsEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING(50),
    }),
    __metadata("design:type", String)
], LogsEntity.prototype, "key", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], LogsEntity.prototype, "data_log", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], LogsEntity.prototype, "created_at", void 0);
LogsEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'logs',
    })
], LogsEntity);
exports.LogsEntity = LogsEntity;
//# sourceMappingURL=logs.entity.js.map