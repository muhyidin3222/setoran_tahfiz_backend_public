"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigDataModule = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const config_controller_1 = require("./config.controller");
const config_service_1 = require("./config.service");
let ConfigDataModule = class ConfigDataModule {
};
ConfigDataModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [config_service_1.ConfigService, master_provider_model_1.config_provider],
        exports: [config_service_1.ConfigService],
        controllers: [config_controller_1.ConfigController],
    })
], ConfigDataModule);
exports.ConfigDataModule = ConfigDataModule;
//# sourceMappingURL=config.module.js.map