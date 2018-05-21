import createjs from 'createjs-easeljs';
import Clubber from './clubber.js';
import {
  frameSettings, framesPerRow,
  modelWidth, modelHeight, actions
} from './constants.js';

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

const init = () => {
  const stage = new createjs.Stage('mainCanvas');
  const canvasDom = document.getElementById('mainCanvas');

  const tooltip = new createjs.DOMElement('info');
  console.log(tooltip);
  tooltip.regX = 0;
  tooltip.regY = 0;
  stage.addChild(tooltip);

  const animations = buildAnimationsObj(actions, framesPerRow);
  const commonData = {
    frames: frameSettings,
    animations: animations,
    framerate: 9,
  };

  const femaleSpriteSheet = new createjs.SpriteSheet(
    Object.assign({}, commonData, {images: ['./src/assets/sprites/woman.png']}));
  const maleSpriteSheet = new createjs.SpriteSheet(
    Object.assign({}, commonData, {images: ['./src/assets/sprites/man.png']}));

  function spawnClubber(name, sex) {
    const c = new Clubber(name, sex == 'male' ? maleSpriteSheet : femaleSpriteSheet);
    clubbers.push(c);
    stage.addChild(c);
    c.play();
  }

  const tick = (event) => {
    for (let clubber of clubbers) {
      tooltip.x = clubber.x + frameSettings.width / 2;
      tooltip.y = clubber.y - frameSettings.height;
      clubber.update(event);
    }
    stage.update(event);
  }

  let clubbers = [];
  spawnClubber('Leonardo', 'male');
  createjs.Ticker.addEventListener('tick', tick);
  createjs.Ticker.framerate = 25;
}

window.onload = init;
