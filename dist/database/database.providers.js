"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const berita_entity_1 = require("../berita/berita.entity");
const notification_entity_1 = require("../notification/notification.entity");
const tag_entity_1 = require("../tag/tag.entity");
const admin_user_entity_1 = require("../user/admin-user.entity");
const user_entity_1 = require("../user/user.entity");
const config_service_1 = require("../common/library/config.service");
const config_module_1 = require("../common/library/config.module");
const config_entity_1 = require("../config/config.entity");
const master_class_entity_1 = require("../class/master_class.entity");
const user_class_entity_1 = require("../class/user_class.entity");
const level_tahfidz_entity_1 = require("../level-tahfidz/level-tahfidz.entity");
const payment_entity_1 = require("../payment/payment.entity");
const school_entity_1 = require("../school/school.entity");
const student_entity_1 = require("../student/student.entity");
const user_setoran_entity_1 = require("../setoran-tahfidz/user-setoran.entity");
const period_entity_1 = require("../school/period.entity");
const guide_tahfidz_entity_1 = require("../guide-tahfidz/guide-tahfidz.entity");
const ustadz_class_entity_1 = require("../class/ustadz-class.entity");
const achievement_entity_1 = require("../achievement/achievement.entity");
const logs_entity_1 = require("../logs/logs.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        imports: [config_module_1.ConfigModule],
        inject: [config_service_1.ConfigService],
        useFactory: async (configService) => {
            const host = configService.get('HOST');
            const username = configService.get('USERNAME');
            const password = configService.get('PASSWORD');
            const database = configService.get('DATABASE');
            const databaseSetup = {
                host,
                username,
                password,
            };
            const sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({ dialect: 'mysql', logging: false, port: 12738 }, databaseSetup), { database, define: {
                    freezeTableName: true,
                    timestamps: false,
                } }));
            sequelize.addModels([
                berita_entity_1.BeritaEntity,
                tag_entity_1.TagEntity,
                user_entity_1.UserEntity,
                notification_entity_1.NotificationEntity,
                admin_user_entity_1.AdminUserEntity,
                config_entity_1.ConfigEntity,
                master_class_entity_1.MasterClassEntity,
                user_class_entity_1.UserClassEntity,
                level_tahfidz_entity_1.LevelTahfidzEntity,
                payment_entity_1.PaymentEntity,
                school_entity_1.SchoolEntity,
                student_entity_1.StudentEntity,
                user_setoran_entity_1.UserSetoranEntity,
                period_entity_1.PeriodEntity,
                guide_tahfidz_entity_1.GuideTahfidzEntity,
                ustadz_class_entity_1.UstadzClassEntity,
                achievement_entity_1.AchievementEntity,
                logs_entity_1.LogsEntity,
            ]);
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map