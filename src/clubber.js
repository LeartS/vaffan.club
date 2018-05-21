import createjs from 'createjs-easeljs';
import {frameSettings, modelWidth, modelHeight} from './constants.js';


export default class Clubber extends createjs.Sprite {

  constructor(name, spritesheet) {
    super(spritesheet, 'walk-right');
    [this.minX, this.maxX] = [frameSettings.regX, modelWidth-frameSettings.width+frameSettings.regX];
    [this.minY, this.maxY] = [frameSettings.regY, modelHeight-frameSettings.height+frameSettings.regY];
    this.name = name;
    this.x = Math.random() * (this.maxX-this.minY) + this.minX;
    this.y = Math.random() * (this.maxY-this.minY) + this.minY;
    // Speeds in px/s. Based on the sprite sizes and normal human height, 1m ~= 32px
    this.vx = 0;
    this.vy = 0;
    this.changeVelocity();
  }

  get direction() {
    if (this.vx > 0) return 'right';
    else if (this.vx < 0) return 'left';
    else if (this.vy < 0) return 'up';
    else return 'down';
  }

  checkBounds() {
    if (this.x < this.minX) this.x = this.minX;
    else if (this.x > this.maxX) this.x = this.maxX;
    if (this.y < this.minY) this.y = this.minY;
    else if (this.y > this.maxY) this.y = this.maxY;
  }

  /*
    Use central limit theorem to generate random numbers
    with a gaussian distribution
  */
  randomNormalNumber(average, sigma, iterations=10) {
    let n = 0;
    for (let i = 0; i < iterations; i++) {
      n += Math.random();
    }
    n -= iterations/2;
    return average + n*sigma;
  }

  changeVelocity() {
    const oldDirection = this.direction;
    let madMultiplier = 1;
    if (Math.random() < 0.05) madMultiplier = 3;
    if (Math.random() >= 0.5) {
      this.vx = this.randomNormalNumber(64, 15) * (Math.random() >= 0.5 ? -1 : 1) * madMultiplier;
      this.vy = 0;
      this.framerate = 9 * Math.abs(this.vx) / 64;
    } else {
      this.vy = this.randomNormalNumber(64, 15) * (Math.random() >= 0.5 ? -1 : 1) * madMultiplier;
      this.vx = 0;
      this.framerate = 9 * Math.abs(this.vy) / 64;
    }
    if (this.direction !== oldDirection) this.setAnimation();
  }

  setAnimation() {
    this.gotoAndPlay(`walk-${this.direction}`);
  }

  update(tickerEvent) {
    if (Math.random() > 0.97) {
      this.changeVelocity();
    }
    this.x += this.vx * (tickerEvent.delta/1000);
    this.y += this.vy * (tickerEvent.delta/1000);
    this.checkBounds();
  }

}
