import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function TimeWall(engine, tick, mode) {
  let x = engine.getTickX(tick);
  let currSize = 0;
  let anim = mode * 10;

  this.update = (dT) => {
    const s = engine.getScale() * 60
    x = engine.getTickX(tick);

    // Dynamic size
    if (engine.getTime()) {
      anim += dT * 6;
    }
    currSize = Math.pow(Math.cos(anim) * 0.5 + 0.5, 4);

    if (x < -100) {
      this.destroyed = true;
    }
    const px = engine.getPlayerX();
    const py = engine.getPlayerY();
    if (px > x - s/2 && px < x + s / 2) {
      if (currSize > 0.2) {
        bus.emit('hit');
      }
    }
  }
  this.render = (ctx) => {
    ctx.save();
    const s = engine.getScale() * 60;
    const h = engine.laneHeight() * currSize;
    let ty = engine.topLimit();
    let by = engine.bottomLimit();
    ctx.translate(x, 0);
    ctx.fillStyle='#00f';
    ctx.fillRect(-s/2, ty, s, h + 5);
    ctx.fillRect(-s/2, by, s, - 5 - h);
    ctx.restore();
  }
}
export default TimeWall;