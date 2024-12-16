import { createCanvas, loadImage, registerFont } from 'canvas';

// Fonts must be loaded from the filesystem
registerFont(__dirname + '/../fonts/Barlow-MediumItalic.ttf', {
  family: 'Barlow-MediumItalic',
});
registerFont(__dirname + '/../fonts/Barlow-Medium.ttf', {
  family: 'Barlow-Medium',
});

export default async function downloadSertifikat(
  username: string,
  url_image: string,
  fileExt: any,
) {
  const loadImg = await loadImage(url_image);
  const canvas = await createCanvas(loadImg.width, loadImg.height, fileExt);

  const ctx = canvas.getContext('2d');
  ctx.drawImage(loadImg, 0, 0);
  // Writing title
  ctx.font = `95px Barlow-MediumItalic`;
  ctx.lineWidth = 10;
  ctx.fillStyle = '#000000';
  const usernameDimen = ctx.measureText(username);
  // Stroke text, then fill
  ctx.fillText(
    username,
    loadImg.width / 2 - usernameDimen.width / 2,
    loadImg.height / 2 + 100
  );

  return canvas;
}
