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
exports.LevelTahfidzEntity = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const school_entity_1 = require("../school/school.entity");
const { STRING, INTEGER } = sequelize_typescript_1.DataType;
let LevelTahfidzEntity = class LevelTahfidzEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], LevelTahfidzEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING(50),
    }),
    __metadata("design:type", String)
], LevelTahfidzEntity.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: INTEGER,
    }),
    __metadata("design:type", Number)
], LevelTahfidzEntity.prototype, "id_school", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: STRING(500),
    }),
    __metadata("design:type", String)
], LevelTahfidzEntity.prototype, "sertifikat_url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], LevelTahfidzEntity.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        onUpdate: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", String)
], LevelTahfidzEntity.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: 'TIMESTAMP',
    }),
    __metadata("design:type", String)
], LevelTahfidzEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => school_entity_1.SchoolEntity, {
        targetKey: 'id',
        foreignKey: 'id_school',
    }),
    __metadata("design:type", school_entity_1.SchoolEntity)
], LevelTahfidzEntity.prototype, "school", void 0);
LevelTahfidzEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'level_tahfidz',
    })
], LevelTahfidzEntity);
exports.LevelTahfidzEntity = LevelTahfidzEntity;
//# sourceMappingURL=level-tahfidz.entity.js.map