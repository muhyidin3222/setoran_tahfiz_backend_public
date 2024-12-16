"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideTahfidzModule = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const guide_tahfidz_controller_1 = require("./guide-tahfidz.controller");
const guide_tahfidz_service_1 = require("./guide-tahfidz.service");
let GuideTahfidzModule = class GuideTahfidzModule {
};
GuideTahfidzModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            guide_tahfidz_service_1.GuideTahfidzService,
            master_provider_model_1.guide_tahfidz_provider,
            master_provider_model_1.user_provider,
            master_provider_model_1.user_setoran_provider,
            master_provider_model_1.student_provider,
            master_provider_model_1.level_tahfidz_provider,
        ],
        exports: [guide_tahfidz_service_1.GuideTahfidzService],
        controllers: [guide_tahfidz_controller_1.GuideTahfidzController],
    })
], GuideTahfidzModule);
exports.GuideTahfidzModule = GuideTahfidzModule;
//# sourceMappingURL=guide-tahfidz.module.js.map