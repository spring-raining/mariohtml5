const Koa = require('koa');
const Router = require('koa-router');
const Environment = require('./environment');

let environment = null;

const app = new Koa();

const router = new Router();

router.post('/init', async (ctx) => {
  environment = Environment();
  const { Enjine, Mario } = environment;
  new Enjine.Application().Initialize(new Mario.LoadingState(), 320, 240);
  ctx.body = 'Init';
});

app.use(router.routes());

if (!module.parent) {
  const port = process.env['MARIOHTML5_SERV_PORT'] || 6000;
  app.listen(port);
  console.log(`mariohtml5-headless sever start (port: ${port})`);
}
