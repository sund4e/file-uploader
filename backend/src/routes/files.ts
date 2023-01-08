import * as Router from 'koa-router';
import { koaBody } from 'koa-body';
import { uploadFile, getFile } from '../service/fileService';
import * as mime from 'mime-types';
import { File } from 'formidable';
import { saveFileInfo, getFiles } from '../service/database';
import { ParameterizedContext } from 'koa';

const router = new Router();

const saveFile = async (file: File, userId: string) => {
  const { name, extension } = await uploadFile(file);
  return saveFileInfo(name, extension, userId);
};

const getUserId = (ctx: ParameterizedContext) => {
  return ctx.state.user.sub;
};

router.post('/files', koaBody({ multipart: true }), async (ctx) => {
  const file = ctx.request.files?.file;
  if (!file) {
    throw Error('invalid file');
  }
  if (Array.isArray(file)) {
    throw Error('Only one file upload at a time allowed');
  }

  const fileId = await saveFile(file, getUserId(ctx));
  ctx.status = 200;
  ctx.body = { fileId };
});

router.get('/files', async (ctx) => {
  const userId = getUserId(ctx);
  const { after_id } = ctx.query;
  if (Array.isArray(after_id)) {
    throw Error('after_id should only be single id');
  }
  ctx.body = await getFiles(userId, after_id);
});

export { router as fileRouter };
