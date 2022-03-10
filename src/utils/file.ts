import fs from 'fs';
import { resolve, join } from 'path';

const tmpPath = resolve(__dirname, '..', '..', 'tmp');

export const deletFile = async (filename: string) => {
  try {
    await fs.promises.stat(join(tmpPath, filename));
  } catch {
    return;
  }

  await fs.promises.unlink(join(tmpPath, filename));
};
