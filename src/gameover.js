import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import * as utils from './utils.js';
import persist from './persist.js';
import bus from './bus.js';
import StartButton from './startbutton.js';
import Text from './text.js';

export default function GameOver() {

  // Title card
  gameobjects.add(new Text('UNSTABLE EINSTEIN', ()=>canvas.width()/2, ()=>canvas.height()*0.2, '#77f', 1, 'center'));

  // Game over :(
  gameobjects.add(new Text('Game Over', ()=>canvas.width()/2, ()=>canvas.height()*0.4, '#f55', 1, 'center'));
  let dist = 1 + parseInt(persist.getDist() * 10);
  gameobjects.add(new Text('Einstein ran ' + dist + ' meters', ()=>canvas.width()/2, ()=>canvas.height()*0.55, '#f55', 0.4, 'center'));

  // Push to play again
  gameobjects.add(new Text('[ Press to retry ]', ()=>canvas.width()/2, ()=>canvas.height()*0.8, '#77f', 0.5, 'center'));
  var fn = () => {
    scene.transition(1);
    bus.off('tap', fn);
  };
  bus.on('tap', fn);
};