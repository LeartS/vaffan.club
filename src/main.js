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

const commonData = {
  frames: {width: 64, height: 64, regX: 32, regY: 64, spacing: 0, margin: 0},
  animations: {
    castSpellUp: [0, 6],
    castSpellLeft: [13, 19],
    castSpellDown: [26, 32],
    castSpellRight: [39, 45],
  },
  framerate: 14,
};

const femaleSpriteSheet = new createjs.SpriteSheet(
  Object.assign({}, commonData, {images: ['./src/assets/sprites/woman.png']}));
const maleSpriteSheet = new createjs.SpriteSheet(
  Object.assign({}, commonData, {images: ['./src/assets/sprites/man.png']}));

let clubbers = [];
function spawnClubber(name, sex) {
  const c = new Clubber(name, sex == 'male' ? maleSpriteSheet : femaleSpriteSheet);
  clubbers.push(c);
  stage.addChild(c);
  c.play();
}

spawnClubber('Leonardo', 'male');
spawnClubber('Elena', 'female');
createjs.Ticker.addEventListener('tick', tick);

export default function tick(event) {
  for (let clubber of clubbers) {
    clubber.x += clubber.vx;
    if (clubber.x > 500) { clubber.x = 0; }
  }
  stage.update(event);
}
