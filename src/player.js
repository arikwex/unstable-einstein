import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function Player(engine) {
  let anim = 0;
  let x = canvas.width() * 0.2;
  let y = canvas.height() * 0.75;
  let vy = 0;
  let normalizedY = 0;

  this.update = (dT) => {
    x = engine.getScale() * 80;

    // Gravitation behavior
    const tl = engine.topLimit();
    const bl = engine.bottomLimit();

    const g = engine.getGravity();
    vy -= g * dT * 4;
    normalizedY += vy * dT;

    if (normalizedY < 0) { normalizedY = 0; vy = 0; }
    if (normalizedY > 1) { normalizedY = 1; vy = 0; }

    y = tl * normalizedY + bl * (1 - normalizedY);
  }
  this.render = (ctx) => {
    ctx.save();
    let a = Date.now() * 0.01;
    var s = engine.getScale() * 30;
    ctx.translate(x, y);
    if (normalizedY > 0.5) {
      ctx.scale(1, -1);
    }
    let breath = Math.cos(a * 0.7);
    let th = -s * (1.95 + breath * 0.05);
    let tw = s * (0.5 + (1 - breath) * 0.02);
    // Body
    ctx.fillStyle = '#fff';
    ctx.fillRect(-tw, 0, 2*tw, th);
    // Hair
    ctx.beginPath()
    ctx.moveTo(s*0.5, th + 2)
    for (let i = 0; i < 10; i++) {
      let p = i / 10;
      let dx2 = Math.cos(p * 5) * (tw + s * 0.25) - s * 0.25;
      let dx = Math.cos(p * 5 + Math.cos(a+i) * 0.5) * s * 0.2 + dx2;
      let dy2 = Math.sin(p * 4.8) * s * 0.5 - s * 0.4 * p;
      let dy = Math.sin(p * 4.8) * s * 0.2 + dy2;
      ctx.lineTo(dx, th + 2 - dy);
      ctx.lineTo(dx2, th + 2 - dy2);
    }
    ctx.lineTo(-tw, th + s * 0.3)
    ctx.closePath();
    ctx.fill();
    // Glasses
    ctx.beginPath()
    ctx.fillStyle = '#7af';
    ctx.arc(tw-s*0.05,th+s * 0.8, s * 0.25, 0,6.29);
    ctx.fill();
    ctx.beginPath()
    ctx.arc(tw-s*0.55,th+s * 0.8, s * 0.25, 0,6.29);
    ctx.fill();
    ctx.restore();
  }
}
export default Player;