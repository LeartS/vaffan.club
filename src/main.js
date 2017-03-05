import createjs from 'createjs-easeljs';

import Clubber from './clubber.js';

const stage = new createjs.Stage('mainCanvas');
const canvasDom = document.getElementById('mainCanvas');

const actions = new Map([
  ['castSpell', 7],
  ['shovel', 8],
  ['walk', 9],
  ['run', 6],
  ['bow', 13],
  // ['trip', 6],
]);

const data = {
  images: ['./src/assets/sprites/woman.png'],
  frames: {width: 64, height: 64, regX: 32, regY: 64, spacing: 0, margin: 0},
  animations: {
    castSpellUp: [0, 6],
    castSpellLeft: [13, 19],
    castSpellDown: [26, 32],
    castSpellRight: [39, 45],
  },
  framerate: 14,
};

const spriteSheet = new createjs.SpriteSheet(data);

let clubbers = [];
function spawnClubber(name) {
  const c = new Clubber(name, spriteSheet);
  clubbers.push(c);
  stage.addChild(c);
  c.play();
}

spawnClubber('Leonardo');
spawnClubber('Elena');
createjs.Ticker.addEventListener('tick', tick);

export default function tick(event) {
  for (let clubber of clubbers) {
    clubber.x += clubber.vx;
    if (clubber.x > 500) { clubber.x = 0; }
  }
  stage.update(event);
}
