"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const notification_module_1 = require("../notification/notification.module");
const student_controller_1 = require("./student.controller");
const student_service_1 = require("./student.service");
let StudentModule = class StudentModule {
};
StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [
            student_service_1.StudentService,
            master_provider_model_1.student_provider,
            master_provider_model_1.user_provider,
            master_provider_model_1.user_class_provider,
            master_provider_model_1.master_class_provider,
            master_provider_model_1.school_provider,
            master_provider_model_1.user_setoran_provider,
            master_provider_model_1.achievement_provider,
        ],
        exports: [student_service_1.StudentService],
        controllers: [student_controller_1.StudentController],
    })
], StudentModule);
exports.StudentModule = StudentModule;
//# sourceMappingURL=student.module.js.map