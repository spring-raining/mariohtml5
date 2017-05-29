const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const Environment = require('./environment');

const environment = Environment();
let gameApp = null;
let tick = null;

const app = new Koa();

const router = new Router();

router.post('/init', async (ctx) => {
  const { Enjine, Mario } = environment;
  gameApp = new Enjine.Application();
  gameApp.Initialize(new Mario.LoadingState(), 320, 240);
  tick = 0;
  ctx.body = 'Init';
});

router.post('/action', async (ctx) => {
  if (!gameApp) {
    ctx.status = 400;
  }
  else {
    const { Enjine, Mario } = environment;
    const keysString = ctx.query['keys'] || '';
    const keys = keysString.toLowerCase().split(',');
    Enjine.KeyboardInput.AllKeyUp();
    if (keys.indexOf('a') >= 0) {
      Enjine.KeyboardInput.KeyDown(Enjine.Keys.A);
    }
    if (keys.indexOf('s') >= 0) {
      Enjine.KeyboardInput.KeyDown(Enjine.Keys.S);
    }
    if (keys.indexOf('left') >= 0) {
      Enjine.KeyboardInput.KeyDown(Enjine.Keys.Left);
    }
    if (keys.indexOf('up') >= 0) {
      Enjine.KeyboardInput.KeyDown(Enjine.Keys.Up);
    }
    if (keys.indexOf('right') >= 0) {
      Enjine.KeyboardInput.KeyDown(Enjine.Keys.Right);
    }
    if (keys.indexOf('down') >= 0) {
      Enjine.KeyboardInput.KeyDown(Enjine.Keys.Down);
    }
    gameApp.timer.Tick();
    tick += 1;

    const death = Mario.MarioCharacter? Mario.MarioCharacter.DeathTime > 0 : false;
    const win = Mario.MarioCharacter? Mario.MarioCharacter.WinTime > 0 : false;

    fs.writeFileSync('out/canvas.png', gameApp.canvas.Canvas.toBuffer());
    ctx.body = {
      tick,
      death,
      win,
      image: gameApp.canvas.Canvas.toDataURL(),
    };
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
