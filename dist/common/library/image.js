"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const imageFileFilter = (req, file, callback) => {
    const fileSize = parseInt(req.headers['content-length']);
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
        return callback(new common_1.BadRequestException('Only jpg|jpeg|png|pdf files are allowed!'), false);
    }
    if (fileSize >= 10000000) {
        return callback(new common_1.BadRequestException('Max Size Image 10Mb'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`.replace(/\s/g, ''));
};
exports.editFileName = editFileName;
//# sourceMappingURL=image.js.map