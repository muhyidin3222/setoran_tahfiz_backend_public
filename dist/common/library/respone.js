"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responeSuccess({ status_code, status_message, data, total, }) {
    return {
        status_code: status_code || 200,
        status_message: status_message || 'Success respone data',
        total,
        data: data || [],
    };
}
exports.default = responeSuccess;
//# sourceMappingURL=respone.js.map