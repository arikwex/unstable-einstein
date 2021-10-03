import * as canvas from './canvas.js';
import * as animations from './animations.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import bus from './bus.js';
import Text from './text.js';

export default function MainMenu() {
  // Title card
  gameobjects.add(new Text('UNSTABLE EINSTEIN', ()=>canvas.width()/2, ()=>canvas.height()*0.2, '#77f', 1, 'center'));

  // Push to star pulser
  var pushToStart = new Text('[ Press to start ]', ()=>canvas.width()/2, ()=>canvas.height()*0.35, '#77f', 0.5, 'center');
  pushToStart.ecs = [animations.pulse((x) => {pushToStart.size = x;}, 0.45, 0.55, 1)];
  gameobjects.add(pushToStart);

  // By me :)
  gameobjects.add(new Text('by Ariel Wexler', ()=>canvas.width()/2, ()=>canvas.height()*0.5, '#fff', 0.35, 'center'));

  // Touch anywhere to go to intro
  var fn = () => {
    scene.transition(1);
    bus.off('tap', fn);
  };
  bus.on('tap', fn);

  this.render = (ctx) => {
    const w = canvas.width();
    const h = canvas.height();
    const x = w * 0.3;
    const y = h * 1.02;
    ctx.save();
    let a = Date.now() * 0.006;
    var s = h * 0.2;
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
      let dx = Math.cos(p * 5 + Math.cos(a+i) * 0.1) * s * 0.2 + dx2;
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