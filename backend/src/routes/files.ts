import * as Router from 'koa-router';
import { koaBody } from 'koa-body';
import { uploadFile, getFile } from '../service/fileService';
import * as mime from 'mime-types';

const router = new Router();

router.post('/files', koaBody({ multipart: true }), async (ctx) => {
  const files = ctx.request.files?.file;
  if (!files) {
    throw Error('invalid file');
  }
  if (Array.isArray(files)) {
    await Promise.all(files.map((file) => uploadFile(file)));
  } else {
    await uploadFile(files);
  }
  ctx.status = 200;
});

export { router as fileRouter };
