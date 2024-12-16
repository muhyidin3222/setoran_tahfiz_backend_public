"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementModule = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const notification_module_1 = require("../notification/notification.module");
const achievement_controller_1 = require("./achievement.controller");
const achievement_service_1 = require("./achievement.service");
let AchievementModule = class AchievementModule {
};
AchievementModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [
            achievement_service_1.AchievementService,
            master_provider_model_1.achievement_provider,
            master_provider_model_1.user_provider,
            master_provider_model_1.student_provider,
        ],
        exports: [achievement_service_1.AchievementService],
        controllers: [achievement_controller_1.AchievementController],
    })
], AchievementModule);
exports.AchievementModule = AchievementModule;
//# sourceMappingURL=achievement.module.js.map