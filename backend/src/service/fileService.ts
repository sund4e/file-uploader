import { File } from 'formidable';
import { copyFile, createReadStream } from 'fs';
import * as mime from 'mime-types';

//Can easily be replaced with some better file storage e.g. cdn

const getFilePath = (fileName: string) => `uploads/${fileName}`;

export const uploadFile = async (file: File) => {
  const { newFilename, mimetype, filepath } = file;
  if (!mimetype) {
    throw Error('invalid mime type');
  }
  const extension = mime.extension(mimetype);
  if (!extension) {
    throw Error('invalid mime type');
  }

  await copyFile(
    filepath,
    getFilePath(`${newFilename}.${extension}`),
    (err) => {
      if (err) throw err;
      console.log(`uploads/${newFilename}.${extension}`);
    }
  );
  return { name: newFilename, extension: extension };
};
