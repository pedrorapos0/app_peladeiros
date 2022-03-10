import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpPath = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpPath,
  storage: multer.diskStorage({
    destination: tmpPath,
    filename: (req, file, cb) => {
      const filehash = crypto.randomBytes(16).toString('hex');
      const filename = `${filehash}-${file.originalname}`;
      return cb(null, filename);
    },
  }),
};
