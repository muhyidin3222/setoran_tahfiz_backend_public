import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  const fileSize = parseInt(req.headers['content-length']);
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    return callback(
      new BadRequestException('Only jpg|jpeg|png|pdf files are allowed!'),
      false,
    );
  }
  if (fileSize >= 10000000) {
    return callback(new BadRequestException('Max Size Image 10Mb'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  callback(null, `${name}-${randomName}${fileExtName}`.replace(/\s/g, ''));
};
