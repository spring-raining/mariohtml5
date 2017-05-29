const Koa = require('koa');
const Router = require('koa-router');
const Environment = require('./environment');

const environment = Environment();
let gameApp = null;

const app = new Koa();

const router = new Router();

router.post('/init', async (ctx) => {
  const { Enjine, Mario } = environment;
  gameApp = new Enjine.Application();
  gameApp.Initialize(new Mario.LoadingState(), 320, 240);
  ctx.body = 'Init';
});

router.post('/action', async (ctx) => {
  if (!gameApp) {
    ctx.status = 400;
  }
  else {
    gameApp.timer.Tick();
    let fs = require('fs');
    fs.writeFileSync('out/canvas.png', gameApp.canvas.Canvas.toBuffer());
    ctx.body = gameApp.canvas.Canvas.toDataURL();
  }
});

router.get('/canvas', async (ctx) => {
  if (!gameApp) {
    ctx.status = 400;
  }
  else {
    ctx.body = gameApp.canvas.Canvas.toDataURL();
  }
});

app.use(router.routes());

if (!module.parent) {
  const port = process.env['MARIOHTML5_SERV_PORT'] || 6000;
  app.listen(port);
  console.log(`mariohtml5-headless sever start (port: ${port})`);
}
