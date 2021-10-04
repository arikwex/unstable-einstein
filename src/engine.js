import * as gameobjects from './gameobjects.js';
import * as canvas from './canvas.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import persist from './persist.js';
import bus from './bus.js';
import Poof from './poof.js';

import Player from './player.js';
import FixedWall from './fixed-wall.js';
import StretchWall from './stretch-wall.js';
import TimeWall from './time-wall.js';

export default function Engine() {
  // Game dimensions
  const railWidth = 0.1;
  const buttonWidth = 0.15;

  // Game state
  let normalTime = true;
  let normalMatter = true;
  let normalSpace = true;
  let anim = 0;
  persist.setDist(0);

  // Game objects
  const player = new Player(this);
  gameobjects.add(player);

  // Touch controls
  bus.on('tap', ({x, y}) => {
    const h = canvas.height();
    const w = canvas.width();
    const th = h - buttonWidth * h;
    if (y > th && y < h) {
      if (x > 0 && x <= w / 3) {
        normalSpace = !normalSpace;
      }
      if (x > w / 3 && x <= w * 2 / 3) {
        normalMatter = !normalMatter;
      }
      if (x > w * 2 / 3 && x <= w) {
        normalTime = !normalTime;
      }
    }
  });

  // Game events
  bus.on('hit', () => {
    persist.setDist(anim);
    scene.transition(3);
  })

  const terrainGen = () => {
    // Build next incremental terrain
  }

  this.getScale = () => {
    return canvas.width() / 800.0;
  }

  this.laneHeight = () => {
    const TL = this.topLimit();
    const BL = this.bottomLimit();
    return (BL - TL) / 2;
  }

  this.topLimit = () => {
    let h = canvas.height();
    return railWidth * h;
  }

  this.bottomLimit = () => {
    let h = canvas.height();
    return h - (railWidth + buttonWidth) * h;
  }

  this.getTickX = (tick) => {
    const w = canvas.width();
    return w + tick * w / 3 - anim * w;
  }

  this.getPlayerX = () => { return player.getX(); }
  this.getPlayerY = () => { return player.getY(); }

  this.getLaneY = (lane) => {
    const TL = this.topLimit();
    const BL = this.bottomLimit();
    const LW = this.laneHeight();
    return TL + lane * LW + LW/2;
  }

  this.getGravity = () => {
    if (normalMatter) {
      return 1;
    } else {
      return -1;
    }
  }

  this.getStretch = () => {
    return normalSpace;
  }

  this.getTime = () => {
    return normalTime;
  }

  let tickNum = 2;
  const generateObstacles = () => {
    let likelihood = Math.min(0.25 + 1.0 / (tickNum * 0.05), 0.66);
    // Matter wall
    if (Math.random() > likelihood) {
      let lane = 0;
      if (Math.random() > 0.5) {
        lane = 1;
      }
      gameobjects.add(new FixedWall(this, tickNum, lane));
      if (tickNum < 15) {
        tickNum += 1;
        return;
      }
    }

    // Space wall
    if (Math.random() > likelihood) {
      let mode = 0;
      if (Math.random() > 0.5) {
        mode = 1;
      }
      gameobjects.add(new StretchWall(this, tickNum, mode));
      if (tickNum < 15) {
        tickNum += 1;
        return;
      }
    }

    // Time wall
    if (Math.random() > likelihood) {
      gameobjects.add(new TimeWall(this, tickNum, Math.random()));
    }

    tickNum += 1;
  };

  let ticker = 0;
  this.update = (dT) => {
    let rate = 0.3 + (tickNum / 500.0);
    anim += dT * rate;
    ticker += dT * rate * 3;
    if (ticker > 1) {
      generateObstacles();
      ticker -= 1;
    }
  };

  const drawSwitch = (ctx, x, y, s, state) => {
    ctx.fillStyle = '#222';
    ctx.fillRect(x - s, y - s * 1.5, s * 2, s * 3);
    if (state) {
      ctx.fillStyle = '#666';
      ctx.fillRect(x - s*0.6, y - s * 4, s * 1.2, s * 4);
      ctx.beginPath();
      ctx.arc(x, y - s * 4, s, 0, 6.29);
      ctx.fill();
    } else {
      ctx.fillStyle = '#777';
      ctx.fillRect(x - s*0.6, y, s * 1.2, s * 4);
      ctx.beginPath();
      ctx.arc(x, y + s * 4, s, 0, 6.29);
      ctx.fill();
    }
  };

  this.render = (ctx) => {
    // Screen dimensions
    const w = canvas.width();
    const h = canvas.height();
    const bh = buttonWidth * h;
    const s = Math.min(bh * 0.2, w * 0.04);
    const switchX = w * 0.28;
    const switchY = bh * 0.65;
    const switchSZ = Math.min(w * 0.015, bh * 0.07);

    // Bottom and top rails
    ctx.fillStyle='#000';
    const TL = this.topLimit();
    ctx.fillRect(0, 0, w, TL);
    ctx.fillRect(0, this.bottomLimit(), w, railWidth * h);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle='#112';
      ctx.fillRect(w - (i * w / 3 + anim * w) % w, 0, 5, TL);
    }

    // Controls area
    ctx.fillStyle='#222';
    ctx.fillRect(0, this.bottomLimit() + railWidth * h, w, bh);

    // Space controls
    ctx.lineWidth = s * 0.3;
    if (normalSpace) {
      ctx.strokeStyle = '#fff';
      ctx.fillStyle = '#3a3';
    } else {
      ctx.strokeStyle = '#666';
      ctx.fillStyle = '#262';
    }
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
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s * 0.8}px monospace`;
    if (normalSpace) {
      ctx.fillStyle = '#fff';
      ctx.fillText('Normal Space', w / 6, bh * 0.2);
      drawSwitch(ctx, switchX, switchY, switchSZ, true);
    } else {
      ctx.fillStyle = '#777';
      ctx.fillText('Warped Space', w / 6, bh * 0.2);
      drawSwitch(ctx, switchX, switchY, switchSZ, false);
    }
    ctx.restore();

    // Matter controls
    ctx.lineWidth = s * 0.3;
    if (normalMatter) {
      ctx.strokeStyle = '#fff';
      ctx.fillStyle = '#a33';
    } else {
      ctx.strokeStyle = '#666';
      ctx.fillStyle = '#622';
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.save();
    ctx.translate(w / 3, h - bh);
    ctx.fillRect(0, 0, w / 3, bh);
    ctx.beginPath();
    ctx.arc(w / 6, bh * 0.65, s * 1.1, 0, 6.29);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s * 0.8}px monospace`;
    if (normalMatter) {
      ctx.fillStyle = '#fff';
      ctx.fillText('Normal Matter', w / 6, bh * 0.2);
      drawSwitch(ctx, switchX, switchY, switchSZ, true);
    } else {
      ctx.fillStyle = '#777';
      ctx.fillText('Anti Matter', w / 6, bh * 0.2);
      drawSwitch(ctx, switchX, switchY, switchSZ, false);
    }
    ctx.restore();

    // Time controls
    ctx.lineWidth = s * 0.3;
    if (normalTime) {
      ctx.strokeStyle = '#fff';
      ctx.fillStyle = '#33a';
    } else {
      ctx.strokeStyle = '#666';
      ctx.fillStyle = '#226';
    }
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
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s * 0.8}px monospace`;
    if (normalTime) {
      ctx.fillStyle = '#fff';
      ctx.fillText('Normal Time', w / 6, bh * 0.2);
      drawSwitch(ctx, switchX, switchY, switchSZ, true);
    } else {
      ctx.fillStyle = '#777';
      ctx.fillText('Paused Time', w / 6, bh * 0.2);
      drawSwitch(ctx, switchX, switchY, switchSZ, false);
    }
    ctx.restore();
  };
};





