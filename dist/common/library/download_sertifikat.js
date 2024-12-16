"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
(0, canvas_1.registerFont)(__dirname + '/../fonts/Barlow-MediumItalic.ttf', {
    family: 'Barlow-MediumItalic',
});
(0, canvas_1.registerFont)(__dirname + '/../fonts/Barlow-Medium.ttf', {
    family: 'Barlow-Medium',
});
async function downloadSertifikat(username, url_image, fileExt) {
    const loadImg = await (0, canvas_1.loadImage)(url_image);
    const canvas = await (0, canvas_1.createCanvas)(loadImg.width, loadImg.height, fileExt);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(loadImg, 0, 0);
    ctx.font = `95px Barlow-MediumItalic`;
    ctx.lineWidth = 10;
    ctx.fillStyle = '#000000';
    const usernameDimen = ctx.measureText(username);
    ctx.fillText(username, loadImg.width / 2 - usernameDimen.width / 2, loadImg.height / 2 + 100);
    return canvas;
}
exports.default = downloadSertifikat;
//# sourceMappingURL=download_sertifikat.js.map