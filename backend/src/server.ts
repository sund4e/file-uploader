import * as Koa from 'koa';
import * as cors from '@koa/cors';
import { fileRouter } from './routes/files';

const app = new Koa();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(fileRouter.routes());

app.listen(5000);

console.log('Server running on port 5000');
