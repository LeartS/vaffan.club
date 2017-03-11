import createjs from 'createjs-easeljs';

import Clubber from './clubber.js';

const stage = new createjs.Stage('mainCanvas');
const canvasDom = document.getElementById('mainCanvas');

const actions = [
  ['spellcast', 7],
  ['thrust', 8],
  ['walk', 9],
  ['slash', 6],
  ['shoot', 13],
  // ['trip', 6],
];

const framesPerRow = 13;

const buildAnimationsObj = (actionsManifest, framesPerRow) => {
  let animationsObj = {};
  actionsManifest.map(([action, nFrames], actionIndex) => {
    ['up', 'left', 'down', 'right'].map((direction, directionIndex) => {
      const initialFrameIndex = (actionIndex*4 + directionIndex) * framesPerRow;
      animationsObj[`${action}-${direction}`] = [initialFrameIndex, initialFrameIndex + nFrames - 1];
    });
  });
  return animationsObj;
};

const animations = buildAnimationsObj(actions, 13);

const commonData = {
  frames: {width: 64, height: 64, regX: 32, regY: 64, spacing: 0, margin: 0},
  animations: buildAnimationsObj(actions, 13),
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
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
spawnClubber('Elena', 'female');
createjs.Ticker.addEventListener('tick', tick);
createjs.Ticker.framerate = 25;

export default function tick(event) {
  for (let clubber of clubbers) {
    clubber.update();
  }
  stage.update(event);
}
