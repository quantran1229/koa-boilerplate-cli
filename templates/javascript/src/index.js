import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

import routers from './routes';

import {routerLog} from './middlewares';

import Logger from './utils/logger';

import Response from './utils/response';
import Constant from './constants';

// Constant
const app = new Koa();
const res = new Response();

app
  .use(cors())
  .use(helmet())
  .use(
    bodyParser({
      onerror: (err, ctx) => {
        res.setError('Body parse error', Constant.HTTP_CODE.BodyParseError);
        return res.send(ctx);
      },
    }),
  )
  .use(routerLog)
  .use(routers);

const server = app.listen(
  Constant.APP_PORT,
  Constant.APP_HOST, // Host default localhost
  () => {
    Logger.info(`App run on ${Constant.APP_HOST}:${Constant.APP_PORT}`);
  },
);

module.exports = server;
