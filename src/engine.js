import * as gameobjects from './gameobjects.js';
import * as canvas from './canvas.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import persist from './persist.js';
import bus from './bus.js';
import Poof from './poof.js';

import Player from './player.js';

export default function Engine() {
  const player = new Player(this);
  gameobjects.add(player);
  // const timeButton = new TimeButton();
  // const matterButton = new TimeButton();
  // const spaceButton = new TimeButton();

  const terrainGen = () => {
    // Build next incremental terrain
  }

  this.getScale = () => {
    return canvas.width() / 800.0;
  }

  this.update = (dT) => {
  };

  this.render = (ctx) => {
    // Screen dimensions
    const w = canvas.width();
    const h = canvas.height();
  };
};





