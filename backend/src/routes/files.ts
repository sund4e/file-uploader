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
  const files = ctx.request.files?.file;
  if (!files) {
    throw Error('invalid file');
  }

  const userId = getUserId(ctx);
  if (Array.isArray(files)) {
    const results = await Promise.all(
      files.map((file) => saveFile(file, userId))
    );
    ctx.body = { files: results };
  } else {
    const result = await saveFile(files, userId);
    ctx.body = { files: [result] };
  }

  ctx.status = 200;
});

router.get('/files', async (ctx) => {
  const userId = getUserId(ctx);
  const { after_id } = ctx.query;
  if (Array.isArray(after_id)) {
    throw Error('after_id should only be single id');
  }
  ctx.body = await getFiles(userId, after_id);
});

router.get('/files/:fileName', async (ctx) => {
  const { fileName } = ctx.params;
  const mimeType = mime.lookup(fileName);
  if (!mimeType) {
    throw Error('invalid file extension');
  }
  const src = await getFile(fileName);
  ctx.response.set('content-type', mimeType);
  ctx.body = src;
});

export { router as fileRouter };
