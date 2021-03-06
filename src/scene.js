import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as animations from './animations.js';
import * as gfx from './gfx.js';
import StartButton from './startbutton.js';
import bus from './bus.js';
import audio from './audio.js';

// Scenes
import MainMenu from './mainmenu.js';
import Intro from './intro.js';
import Engine from './engine.js';
import GameOver from './gameover.js';

// Init/Reset game
export function init() { bus.emit('scene', 0); }

// Go to scene number
export function goto(s) { bus.emit('scene', s); }

// Go to scene number
export function transition(s) {
  bus.emit('txn');
  // When transition animation done, swap scene and perform fade in
  bus.on('txn-done', () => {
    bus.emit('scene', s);
    gameobjects.add(new animations.transition(0.9, false));
  });
  // Start transition animation and stop all updaters
  gameobjects.get().forEach((go) => {go.update=undefined;});
  gameobjects.add(new animations.transition(0.4, true));
}

(() => {
  // Scene configuration
  var scene = 0;
  var sceneConfig = (sceneNum) => {
    scene = sceneNum;
    bus.clear();
    bus.on('scene', sceneConfig);
    audio.stopMusic();
    audio.setup();
    gameobjects.clear();

    // [SCENE = 0] MAIN MENU
    if (scene == 0) { gameobjects.add(new MainMenu()); }

    // [SCENE = 1] INSTRUCTION
    if (scene == 1) { gameobjects.add(new Intro()); audio.music(); }

    // [SCENE = 2] GAME
    if (scene == 2) { gameobjects.add(new Engine()); audio.bgRocket(); }

    // [SCENE = 3] LOSE SCREEN
    if (scene == 3) { gameobjects.add(new GameOver()); }
  };

  bus.on('scene', sceneConfig);
})();