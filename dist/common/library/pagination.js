"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (query) => {
    const { page, total } = query;
    if (page && total) {
        const limit = total ? Number(total) : 10;
        const offset = Number(page) * limit - limit;
        const queryGet = {
            offset: offset,
            limit: limit,
        };
        return queryGet;
    }
    else {
        return {};
    }
};
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map