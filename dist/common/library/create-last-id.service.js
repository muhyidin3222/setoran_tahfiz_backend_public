"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newId = exports.padIt = void 0;
const lodash_1 = require("lodash");
const moment = require('moment');
function padIt(s) {
    s = '' + s;
    while (s.length < 3) {
        s = '0' + s;
    }
    return s;
}
exports.padIt = padIt;
function newId(lastId, firstText) {
    const datetime = moment().tz('Asia/Jakarta').format('YYYYMMDDHHmmss');
    const partsID = lastId === null || lastId === void 0 ? void 0 : lastId.split('-');
    const partNumber = (0, lodash_1.parseInt)(partsID[2]);
    const stringInc = partsID.length ? padIt(partNumber + 1) : '001';
    return firstText + datetime + '-' + stringInc;
}
exports.newId = newId;
//# sourceMappingURL=create-last-id.service.js.map