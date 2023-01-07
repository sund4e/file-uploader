import * as Router from 'koa-router';
import { koaBody } from 'koa-body';
import { uploadFile, getFile } from '../service/fileService';
import * as mime from 'mime-types';
import { File } from 'formidable';
import { saveFileInfo } from '../service/database';

const router = new Router();

const saveFile = async (file: File, user: { sub: string }) => {
  const { name, extension } = await uploadFile(file);
  return saveFileInfo(name, extension, user.sub);
};

router.post('/files', koaBody({ multipart: true }), async (ctx) => {
  const file = ctx.request.files?.file;
  if (!file) {
    throw Error('invalid file');
  }
  if (Array.isArray(file)) {
    throw Error('Only one file upload at a time allowed');
  }

  const fileId = await saveFile(file, ctx.state.user);
  ctx.status = 200;
  ctx.body = { fileId };
});

export { router as fileRouter };
