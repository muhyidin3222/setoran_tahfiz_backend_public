"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_new_path = exports.check_video_mp4_360 = exports.check_path_video = void 0;
const check_path_video = (url) => {
    if (url && url.length) {
        if (url.includes('https://'))
            return url;
        return 'https://bisaekspor.s3.amazonaws.com/production' + url;
    }
    else {
        return null;
    }
};
exports.check_path_video = check_path_video;
const check_video_mp4_360 = (url) => {
    if (url && url.length) {
        if (url.includes('https://'))
            return url;
        return 'https://video-bix.s3.ap-southeast-1.amazonaws.com/production' + url;
    }
    else {
        return null;
    }
};
exports.check_video_mp4_360 = check_video_mp4_360;
const check_new_path = (url) => {
    if (url && url.length) {
        if (url.includes('https://'))
            return url;
        return 'https://cdn.bisaekspor.com/production' + url;
    }
    else {
        return null;
    }
};
exports.check_new_path = check_new_path;
//# sourceMappingURL=baseUrlVideoCheck.js.map