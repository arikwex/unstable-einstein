import * as canvas from './canvas.js';
import * as animations from './animations.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import bus from './bus.js';
import Text from './text.js';

export default function MainMenu() {
  // Title card
  gameobjects.add(new Text('UNSTABLE EINSTEIN', ()=>canvas.width()/2, ()=>canvas.height()*0.4, '#7f7', 1, 'center'));

  // Push to star pulser
  var pushToStart = new Text('[ Press to start ]', ()=>canvas.width()/2, ()=>canvas.height()*0.6, '#7f7', 0.5, 'center');
  pushToStart.ecs = [animations.pulse((x) => {pushToStart.size = x;}, 0.45, 0.55, 1)];
  gameobjects.add(pushToStart);

  // By me :)
  gameobjects.add(new Text('by Ariel Wexler', ()=>canvas.width()/2, ()=>canvas.height()*0.8, '#777', 0.35, 'center'));

  // Touch anywhere to go to intro
  var fn = () => {
    scene.transition(1);
    bus.off('tap', fn);
  };
  bus.on('tap', fn);
}