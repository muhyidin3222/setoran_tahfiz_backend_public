"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetoranTahfidzModule = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const notification_module_1 = require("../notification/notification.module");
const setoran_tahfidz_controller_1 = require("./setoran-tahfidz.controller");
const setoran_tahfidz_service_1 = require("./setoran-tahfidz.service");
const config_module_1 = require("../common/library/config.module");
const config_service_1 = require("../common/library/config.service");
let SetoranTahfidzModule = class SetoranTahfidzModule {
};
SetoranTahfidzModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule, config_module_1.ConfigModule],
        providers: [
            setoran_tahfidz_service_1.SetoranTahfidzService,
            master_provider_model_1.user_setoran_provider,
            master_provider_model_1.user_provider,
            master_provider_model_1.student_provider,
            master_provider_model_1.guide_tahfidz_provider,
            master_provider_model_1.achievement_provider,
            master_provider_model_1.level_tahfidz_provider,
            config_service_1.ConfigService,
        ],
        exports: [setoran_tahfidz_service_1.SetoranTahfidzService],
        controllers: [setoran_tahfidz_controller_1.SetoranTahfidzController],
    })
], SetoranTahfidzModule);
exports.SetoranTahfidzModule = SetoranTahfidzModule;
//# sourceMappingURL=setoran-tahfidz.module.js.map