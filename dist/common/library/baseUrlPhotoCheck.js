"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (url) => {
    if (url && url.length) {
        if (url.includes('https://'))
            return url;
        return 'https://image.bisaekspor.net/production' + url;
    }
    else {
        return null;
    }
};
//# sourceMappingURL=baseUrlPhotoCheck.js.map