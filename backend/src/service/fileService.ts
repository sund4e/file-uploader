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
  const type = mime.extension(mimetype);
  await copyFile(filepath, getFilePath(`${newFilename}.${type}`), (err) => {
    if (err) throw err;
    console.log(`uploads/${newFilename}.${type}`);
  });
};
