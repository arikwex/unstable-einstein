import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import bus from './bus.js';
import StartButton from './startbutton.js';
import Text from './text.js';
import persist from './persist.js';

export default function Intro() {
  gameobjects.add(new Text('Instructions', ()=>canvas.width()*0.03, ()=>canvas.width()*0.05, '#fff', 0.5, 'left'));
  gameobjects.add(new StartButton());
  bus.on('start', () => {
    scene.transition(2);
  });

  this.render = (ctx) => {
    const w = canvas.width();
    const h = canvas.height() * 0.8;

    const BW = w / 30;
    const BH = h / 10;
    ctx.save();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.color;
    ctx.font = `${w * 0.035}px monospace`;

    // RED OBSTACLES
    ctx.fillStyle = '#f00';
    ctx.fillRect(w/4 - BW/2-BH/3, h/3 - BH, BW, BH);
    ctx.fillRect(w/4 - BW/2+BH/3, h/3, BW, BH);
    ctx.fillStyle = '#fff';
    ctx.fillText('Avoid red obstacles by', w*3/8, h/3-BH/4);
    ctx.fillText('destabilizing gravity.', w*3/8, h/3+BH/4);

    // GREEN OBSTACLES
    ctx.fillStyle = '#0e0';
    ctx.fillRect(w/4 - BW/2-BH/3, h*2/3 - BH / 10, BW, BH/5);
    ctx.fillRect(w/4 - BW/2+BH/3, h*2/3- BH, BW, BH*2);
    ctx.fillStyle = '#fff';
    ctx.fillText('Avoid green obstacles by', w*3/8, h*2/3-BH/4);
    ctx.fillText('destabilizing space.', w*3/8, h*2/3+BH/4);

    // BLUE OBSTACLES
    ctx.fillStyle = '#00f';
    ctx.fillRect(w/4 - BW/2-BH/3, h - BH, BW, BH/5);
    ctx.fillRect(w/4 - BW/2-BH/3, h + BH, BW, -BH/5);
    ctx.fillRect(w/4 - BW/2+BH/3, h - BH, BW, BH*0.95);
    ctx.fillRect(w/4 - BW/2+BH/3, h + BH, BW, -BH*0.95);

    ctx.fillStyle = '#fff';
    ctx.fillText('Avoid blue obstacles by', w*3/8, h-BH/4);
    ctx.fillText('destabilizing time.', w*3/8, h+BH/4);

    ctx.restore();
  }
};