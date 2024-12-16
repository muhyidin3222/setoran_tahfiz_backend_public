"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleUser = exports.dataConstants = exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'as23slsd92',
    key_third_party: '09db431d-0807-4d87-833c-76d7744ab9f4',
};
exports.dataConstants = {
    master_admin: 'master_admin',
    admin: 'admin',
    user: 'user',
    ustadz: 'ustadz',
};
exports.roleUser = {
    master_admin: [],
    admin: [
        {
            name: 'berita',
            path: ['get', 'create', 'update', '/delete/:id', '/detail/:id'],
        },
        {
            name: 'berita',
            path: ['get', 'create', 'update', '/delete/:id', '/detail/:id'],
        },
    ],
    user: 'user',
    ustadz: 'ustadz',
};
//# sourceMappingURL=auth.constants.js.map