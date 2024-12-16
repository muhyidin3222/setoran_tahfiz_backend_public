"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_module_1 = require("../common/library/config.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("../auth/auth.module");
const library_module_1 = require("../common/library/library.module");
const http_exception_filter_1 = require("../common/library/http-exception.filter");
const database_module_1 = require("../database/database.module");
const berita_module_1 = require("../berita/berita.module");
const notification_module_1 = require("../notification/notification.module");
const tag_module_1 = require("../tag/tag.module");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../user/user.module");
const master_provider_model_1 = require("../common/provider/master-provider-model");
const config_module_2 = require("../config/config.module");
const student_module_1 = require("../student/student.module");
const class_module_1 = require("../class/class.module");
const level_tahfidz_module_1 = require("../level-tahfidz/level-tahfidz.module");
const payment_module_1 = require("../payment/payment.module");
const school_module_1 = require("../school/school.module");
const setoran_tahfidz_module_1 = require("../setoran-tahfidz/setoran-tahfidz.module");
const guide_tahfidz_module_1 = require("../guide-tahfidz/guide-tahfidz.module");
const logger_middleware_1 = require("../common/middleware/logger.middleware");
const config_service_1 = require("../common/library/config.service");
const achievement_module_1 = require("../achievement/achievement.module");
const logs_module_1 = require("../logs/logs.module");
let AppModule = class AppModule {
    configure(consumer) {
        const configService = new config_service_1.ConfigService();
        const log = configService.get('LOGGER');
        if (log)
            consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            config_module_2.ConfigDataModule,
            auth_module_1.AuthModule,
            library_module_1.LibraryModule,
            database_module_1.DatabaseModule,
            berita_module_1.BeritaModule,
            notification_module_1.NotificationModule,
            tag_module_1.TagModule,
            user_module_1.UserModule,
            class_module_1.ClassModule,
            level_tahfidz_module_1.LevelTahfidzModule,
            payment_module_1.PaymentModule,
            achievement_module_1.AchievementModule,
            school_module_1.SchoolModule,
            setoran_tahfidz_module_1.SetoranTahfidzModule,
            student_module_1.StudentModule,
            guide_tahfidz_module_1.GuideTahfidzModule,
            logs_module_1.LogsModule,
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            config_1.ConfigService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            master_provider_model_1.config_provider,
            master_provider_model_1.user_provider,
            master_provider_model_1.user_setoran_provider,
        ],
        exports: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map