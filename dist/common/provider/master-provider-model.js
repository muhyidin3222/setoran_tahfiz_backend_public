"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs_provider = exports.achievement_provider = exports.ustadz_class_provider = exports.guide_tahfidz_provider = exports.period_provider = exports.payment_provider = exports.level_tahfidz_provider = exports.user_setoran_provider = exports.master_class_provider = exports.user_class_provider = exports.school_provider = exports.notification_provider = exports.tag_provider = exports.config_provider = exports.berita_provider = exports.admin_user_provider = exports.user_provider = exports.student_provider = void 0;
const admin_user_entity_1 = require("../../user/admin-user.entity");
const user_entity_1 = require("../../user/user.entity");
const berita_entity_1 = require("../../berita/berita.entity");
const config_entity_1 = require("../../config/config.entity");
const tag_entity_1 = require("../../tag/tag.entity");
const notification_entity_1 = require("../../notification/notification.entity");
const student_entity_1 = require("../../student/student.entity");
const school_entity_1 = require("../../school/school.entity");
const master_class_entity_1 = require("../../class/master_class.entity");
const user_class_entity_1 = require("../../class/user_class.entity");
const user_setoran_entity_1 = require("../../setoran-tahfidz/user-setoran.entity");
const level_tahfidz_entity_1 = require("../../level-tahfidz/level-tahfidz.entity");
const payment_entity_1 = require("../../payment/payment.entity");
const period_entity_1 = require("../../school/period.entity");
const guide_tahfidz_entity_1 = require("../../guide-tahfidz/guide-tahfidz.entity");
const ustadz_class_entity_1 = require("../../class/ustadz-class.entity");
const achievement_entity_1 = require("../../achievement/achievement.entity");
const logs_entity_1 = require("../../logs/logs.entity");
const user_provider = {
    provide: 'USER_REPOSITORY',
    useValue: user_entity_1.UserEntity,
};
exports.user_provider = user_provider;
const user_class_provider = {
    provide: 'USER_CLASS_REPOSITORY',
    useValue: user_class_entity_1.UserClassEntity,
};
exports.user_class_provider = user_class_provider;
const master_class_provider = {
    provide: 'MASTER_CLASS_REPOSITORY',
    useValue: master_class_entity_1.MasterClassEntity,
};
exports.master_class_provider = master_class_provider;
const admin_user_provider = {
    provide: 'ADMIN_USER_REPOSITORY',
    useValue: admin_user_entity_1.AdminUserEntity,
};
exports.admin_user_provider = admin_user_provider;
const berita_provider = {
    provide: 'BERITA_REPOSITORY',
    useValue: berita_entity_1.BeritaEntity,
};
exports.berita_provider = berita_provider;
const user_setoran_provider = {
    provide: 'USER_SETORAN_REPOSITORY',
    useValue: user_setoran_entity_1.UserSetoranEntity,
};
exports.user_setoran_provider = user_setoran_provider;
const config_provider = {
    provide: 'CONFIG_REPOSITORY',
    useValue: config_entity_1.ConfigEntity,
};
exports.config_provider = config_provider;
const tag_provider = {
    provide: 'TAG_REPOSITORY',
    useValue: tag_entity_1.TagEntity,
};
exports.tag_provider = tag_provider;
const level_tahfidz_provider = {
    provide: 'LEVEL_TAHFIDZ_REPOSITORY',
    useValue: level_tahfidz_entity_1.LevelTahfidzEntity,
};
exports.level_tahfidz_provider = level_tahfidz_provider;
const notification_provider = {
    provide: 'NOTIFICATION_REPOSITORY',
    useValue: notification_entity_1.NotificationEntity,
};
exports.notification_provider = notification_provider;
const student_provider = {
    provide: 'STUDENT_REPOSITORY',
    useValue: student_entity_1.StudentEntity,
};
exports.student_provider = student_provider;
const school_provider = {
    provide: 'SCHOOL_REPOSITORY',
    useValue: school_entity_1.SchoolEntity,
};
exports.school_provider = school_provider;
const payment_provider = {
    provide: 'PAYMENT_REPOSITORY',
    useValue: payment_entity_1.PaymentEntity,
};
exports.payment_provider = payment_provider;
const period_provider = {
    provide: 'PERIOD_REPOSITORY',
    useValue: period_entity_1.PeriodEntity,
};
exports.period_provider = period_provider;
const guide_tahfidz_provider = {
    provide: 'GUIDE_TAHFIDZ_REPOSITORY',
    useValue: guide_tahfidz_entity_1.GuideTahfidzEntity,
};
exports.guide_tahfidz_provider = guide_tahfidz_provider;
const ustadz_class_provider = {
    provide: 'USTADZ_CLASS_REPOSITORY',
    useValue: ustadz_class_entity_1.UstadzClassEntity,
};
exports.ustadz_class_provider = ustadz_class_provider;
const achievement_provider = {
    provide: 'ACHIEVEMENT_REPOSITORY',
    useValue: achievement_entity_1.AchievementEntity,
};
exports.achievement_provider = achievement_provider;
const logs_provider = {
    provide: 'LOGS_REPOSITORY',
    useValue: logs_entity_1.LogsEntity,
};
exports.logs_provider = logs_provider;
//# sourceMappingURL=master-provider-model.js.map