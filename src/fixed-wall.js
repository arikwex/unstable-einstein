import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function FixedWall(engine, tick, lane) {
  let x = engine.getTickX(tick);
  let y = engine.getLaneY(lane);

  this.update = (dT) => {
    const s = engine.getScale() * 60
    x = engine.getTickX(tick-0.1);
    y = engine.getLaneY(lane);
    if (x < -100) {
      this.destroyed = true;
    }
    const px = engine.getPlayerX();
    const py = engine.getPlayerY();
    if (px > x - s/2 && px < x + s / 2) {
      const midY = engine.getLaneY(0.5);
      if (lane == 0 && py < midY) {
        bus.emit('hit');
      }
      if (lane == 1 && py > midY) {
        bus.emit('hit');
      }
    }
  }
  this.render = (ctx) => {
    ctx.save();
    const s = engine.getScale() * 60;
    const h = engine.laneHeight();
    ctx.translate(x, y);
    ctx.fillStyle='#f00';
    ctx.fillRect(-s/2, -h/2, s, h);
    ctx.restore();
  }
}
export default FixedWall;