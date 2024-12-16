"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require('moment');
exports.default = (banned_date, level_user) => {
    const endDate = moment(banned_date, 'YYYY-MM-DD')
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DD HH:mm:ss');
    const startDate = moment().tz('Asia/Jakarta');
    const dayDurationDate = moment.duration(startDate.diff(endDate)).asDays();
    const checkDateBanned = level_user === 2 ? dayDurationDate > 7 : false;
    return checkDateBanned;
};
//# sourceMappingURL=checkBanned.js.map