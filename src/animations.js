import * as canvas from './canvas.js';
import bus from './bus.js';

export function pulse(fn, min, max, period) {
  var anim = 0;
  return (dT) => {
    anim += dT;
    fn((Math.sin(anim / period * 6.3) + 1) / 2 * (max - min) + min);
  }
};

export function transition(duration, fadeOut) {
  var anim = 0;
  this.update = (dT) => {
    anim += dT / duration;
    if (anim > 1 && fadeOut) {
      this.destroyed = true;
      bus.emit('txn-done');
    }
  };
  this.render = (ctx) => {
    var w = canvas.width();
    var h = canvas.height();
    var tf = 0;
    if (fadeOut) { tf = Math.max(1-anim*anim, 0); }
    else { tf = Math.pow(Math.max(anim-0.3, 0)*1.3, 2);}
    // Top plate
    ctx.save();
    ctx.fillStyle = '#343';
    ctx.translate(0, -h*0.6 * tf);
    ctx.fillRect(0, 0, w, h/2);
    ctx.strokeStyle = '#7f7';
    ctx.fillStyle = '#7f7';
    ctx.lineWidth = w * 0.03;
    ctx.fillRect(0,h/2,w,h*0.05);
    ctx.strokeRect(w*0.25, h*0.2, w*0.5, h*0.2);
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.font=`${w*0.05}px monospace`;
    ctx.fillText('UNSTABLE',w*0.5,h*0.27);
    ctx.fillText('EINSTEIN',w*0.5,h*0.33);
    ctx.restore();

    // Bottom plate
    ctx.save();
    ctx.fillStyle = '#343';
    ctx.translate(0, h*0.6 * tf);
    ctx.fillRect(0, h/2, w, h/2);
    ctx.fillStyle = '#7f7';
    ctx.fillRect(0,h*0.55,w,-h*0.05);
    ctx.restore();
  }
}