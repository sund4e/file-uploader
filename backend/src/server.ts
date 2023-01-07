import * as Koa from 'koa';
import * as cors from '@koa/cors';
import { fileRouter } from './routes/files';
import * as jwt from 'koa-jwt';

const app = new Koa();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

if (!process.env.JWT_SECRET) {
  throw Error('No JWT_SECRET in env');
}
app.use(jwt({ secret: process.env.JWT_SECRET, cookie: 'access_token' }));

app.use(fileRouter.routes());

app.listen(process.env.PORT);

console.log(`Server running on port ${process.env.PORT}`);
