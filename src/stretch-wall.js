import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function StretchWall(engine, tick, mode) {
  let x = engine.getTickX(tick);
  let y = engine.getLaneY(0.5);
  let currSize = 0;

  this.update = (dT) => {
    const s = engine.getScale() * 60
    x = engine.getTickX(tick);

    // Dynamic size
    let targetSize = mode;
    if (engine.getStretch()) {
      targetSize = 1 - mode;
    }
    currSize += (targetSize - currSize) * 6.0 * dT;

    if (x < -100) {
      this.destroyed = true;
    }
    const px = engine.getPlayerX();
    const py = engine.getPlayerY();
    if (px > x - s/2 && px < x + s / 2) {
      if (currSize > 0.7) {
        bus.emit('hit');
      }
    }
  }
  this.render = (ctx) => {
    ctx.save();
    const s = engine.getScale() * 60;
    const h = engine.laneHeight() * 2 * (0.9 * currSize + 0.1);
    ctx.translate(x, y);
    ctx.fillStyle='#0e0';
    ctx.fillRect(-s/2, -h/2, s, h);
    ctx.restore();
  }
}
export default StretchWall;