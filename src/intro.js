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
    persist.reset();
    scene.transition(2);
  });
};