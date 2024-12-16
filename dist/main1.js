"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const http_exception_filter_1 = require("./common/library/http-exception.filter");
const validation_pipe_1 = require("./common/library/validation.pipe");
const config_service_1 = require("./common/library/config.service");
const runInCluster_1 = require("./common/library/runInCluster");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const feature_policy_1 = __importDefault(require("feature-policy"));
const allowedOrigins = [
    'http://localhost:3006',
    'http://localhost:3007',
    'https://setoran-tahfidz-cms.aplikasipileg.com',
];
async function bootstrap() {
    const configService = new config_service_1.ConfigService();
    const port = configService.get('PORT');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new validation_pipe_1.JoinValidationPipe());
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: {
            policy: 'cross-origin',
        },
    }));
    app.use((0, feature_policy_1.default)({
        features: {
            fullscreen: ["'self'"],
            vibrate: ["'none'"],
            syncXhr: ["'none'"],
        },
    }));
    await app.listen(port);
}
(0, runInCluster_1.runInCluster)(bootstrap);
//# sourceMappingURL=main1.js.map