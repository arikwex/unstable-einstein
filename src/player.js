import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function Player(engine) {
  let anim = 0;
  let x = canvas.width() * 0.2;
  let y = canvas.height() * 0.75;

  this.update = (dT) => {
  }
  this.render = (ctx) => {
    ctx.save();
    let a = Date.now() * 0.01;
    var s = engine.getScale() * 30;
    ctx.translate(x, y);
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