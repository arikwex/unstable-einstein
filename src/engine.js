import * as gameobjects from './gameobjects.js';
import * as canvas from './canvas.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import persist from './persist.js';
import bus from './bus.js';
import Poof from './poof.js';

import Player from './player.js';

export default function Engine() {
  // Game dimensions
  const railWidth = 0.1;
  const buttonWidth = 0.15;

  // Game objects
  const player = new Player(this);
  gameobjects.add(player);

  const terrainGen = () => {
    // Build next incremental terrain
  }

  this.getScale = () => {
    return canvas.width() / 800.0;
  }

  this.update = (dT) => {
  };

  this.topLimit = () => {
    let h = canvas.height();
    return railWidth * h;
  }

  this.bottomLimit = () => {
    let h = canvas.height();
    return h - (railWidth + buttonWidth) * h;
  }

  this.render = (ctx) => {
    // Screen dimensions
    const w = canvas.width();
    const h = canvas.height();
    const bh = buttonWidth * h;
    const s = Math.min(bh * 0.2, w * 0.04);

    // Bottom and top rails
    ctx.fillStyle='#000';
    ctx.fillRect(0, 0, w, this.topLimit());
    ctx.fillRect(0, this.bottomLimit(), w, railWidth * h);

    // Controls area
    ctx.fillStyle='#222';
    ctx.fillRect(0, this.bottomLimit() + railWidth * h, w, bh);

    // Space controls
    ctx.lineWidth = s * 0.3;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#363';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.save();
    ctx.translate(0, h - bh);
    ctx.fillRect(0, 0, w / 3, bh);
    ctx.beginPath();
    ctx.moveTo(w / 6 - s * 1.5, bh * 0.65)
    ctx.lineTo(w / 6 - s * 0.2, bh * 0.65 - s)
    ctx.lineTo(w / 6 - s * 0.2, bh * 0.65 + s)
    ctx.lineTo(w / 6 - s * 1.5, bh * 0.65)
    ctx.moveTo(w / 6 + s * 1.5, bh * 0.65)
    ctx.lineTo(w / 6 + s * 0.2, bh * 0.65 - s)
    ctx.lineTo(w / 6 + s * 0.2, bh * 0.65 + s)
    ctx.lineTo(w / 6 + s * 1.5, bh * 0.65)
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s * 0.8}px monospace`;
    ctx.fillText('Normal Space', w / 6, bh * 0.2);
    ctx.restore();

    // Matter controls
    ctx.lineWidth = s * 0.3;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#633';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.save();
    ctx.translate(w / 3, h - bh);
    ctx.fillRect(0, 0, w / 3, bh);
    ctx.beginPath();
    ctx.arc(w / 6, bh * 0.65, s * 1.1, 0, 6.29);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s * 0.8}px monospace`;
    ctx.fillText('Normal Matter', w / 6, bh * 0.2);
    ctx.restore();

    // Time controls
    ctx.lineWidth = s * 0.3;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#336';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.save();
    ctx.translate(w * 2 / 3, h - bh);
    ctx.fillRect(0, 0, w / 3, bh);
    ctx.beginPath();
    ctx.moveTo(w / 6 - s, bh * 0.65 - s)
    ctx.lineTo(w / 6 + s, bh * 0.65 - s)
    ctx.lineTo(w / 6 - s, bh * 0.65 + s)
    ctx.lineTo(w / 6 + s, bh * 0.65 + s)
    ctx.closePath()
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s * 0.8}px monospace`;
    ctx.fillText('Normal Time', w / 6, bh * 0.2);
    ctx.restore();
  };
};





