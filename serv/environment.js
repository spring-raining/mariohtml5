module.exports = () => {
  const Enjine = {};
  //require('./../Enjine/core')(Enjine);
  require('./../Enjine/gameCanvas')(Enjine);
  require('./../Enjine/keyboardInput')(Enjine);
  require('./../Enjine/resources')(Enjine);
  require('./../Enjine/drawable')(Enjine);
  require('./../Enjine/state')(Enjine);
  require('./../Enjine/gameTimer')(Enjine);
  require('./../Enjine/camera')(Enjine);
  require('./../Enjine/drawableManager')(Enjine);
  require('./../Enjine/sprite')(Enjine);
  require('./../Enjine/spriteFont')(Enjine);
  require('./../Enjine/frameSprite')(Enjine);
  require('./../Enjine/animatedSprite')(Enjine);
  require('./../Enjine/collideable')(Enjine);
  require('./../Enjine/application')(Enjine);

  const Mario = {};
  //require('./../code/setup')(Mario, Enjine);
  require('./../code/spriteCuts')(Mario, Enjine);
  require('./../code/level')(Mario, Enjine);
  require('./../code/backgroundGenerator')(Mario, Enjine);
  require('./../code/backgroundRenderer')(Mario, Enjine);
  require('./../code/improvedNoise')(Mario, Enjine);
  require('./../code/notchSprite')(Mario, Enjine);
  require('./../code/character')(Mario, Enjine);
  require('./../code/levelRenderer')(Mario, Enjine);
  require('./../code/levelGenerator')(Mario, Enjine);
  require('./../code/spriteTemplate')(Mario, Enjine);
  require('./../code/enemy')(Mario, Enjine);
  require('./../code/fireball')(Mario, Enjine);
  require('./../code/sparkle')(Mario, Enjine);
  require('./../code/coinAnim')(Mario, Enjine);
  require('./../code/mushroom')(Mario, Enjine);
  require('./../code/particle')(Mario, Enjine);
  require('./../code/fireFlower')(Mario, Enjine);
  require('./../code/bulletBill')(Mario, Enjine);
  require('./../code/flowerEnemy')(Mario, Enjine);
  require('./../code/shell')(Mario, Enjine);

  require('./../code/titleState')(Mario, Enjine);
  require('./../code/loadingState')(Mario, Enjine);
  require('./../code/loseState')(Mario, Enjine);
  require('./../code/winState')(Mario, Enjine);
  require('./../code/mapState')(Mario, Enjine);
  require('./../code/levelState')(Mario, Enjine);

  //require('./../code/music')(Mario, Enjine);

  return { Enjine, Mario };
};
