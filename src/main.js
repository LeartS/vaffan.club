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

class Club {
  constructor () {
    this.clubbers = [];
    this.stage = new createjs.Stage('mainCanvas');
    this.canvasDom = document.getElementById('mainCanvas');
    this.tooltip = new createjs.DOMElement('info');
    console.log(this.tooltip);
    this.tooltip.regX = 0;
    this.tooltip.regY = 0;
    this.stage.addChild(this.tooltip);
    this.spawnClubber('Leonardo', 'male');
    createjs.Ticker.addEventListener('tick', this.tick.bind(this));
    createjs.Ticker.framerate = 25;
  }

  spawnClubber (name, sex) {
    const c = new Clubber(name, sex == 'male' ? maleSpriteSheet : femaleSpriteSheet);
    this.clubbers.push(c);
    this.stage.addChild(c);
    c.play();
  }

  tick (event) {
    for (let clubber of this.clubbers) {
      this.tooltip.x = clubber.x + frameSettings.width / 2;
      this.tooltip.y = clubber.y - frameSettings.height;
      clubber.update(event);
    }
    this.stage.update(event);
  }
}


const club = new Club();
window.onload = club.init;
