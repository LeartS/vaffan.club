import createjs from 'createjs-easeljs';


export default class Clubber extends createjs.Sprite {

  constructor(name, spritesheet) {
    super(spritesheet, 'walk-right');
    [this.minX, this.maxX] = [32, 1568];
    [this.minY, this.maxY] = [64, 900];
    this.name = name;
    this.x = Math.random() * (this.maxX-this.minY) + this.minX;
    this.y = Math.random() * (this.maxY-this.minY) + this.minY;
    this.updateVelocity();
    this.setAnimation();
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

  updateVelocity() {
    if (Math.random() >= 0.5) {
      this.vx = Math.random() * 20 - 10;
      this.vy = 0;
    } else {
      this.vy = Math.random() * 16 - 8;
      this.vx = 0;
    }
  }

  setAnimation() {
    this.gotoAndPlay(`walk-${this.direction}`);
  }

  update() {
    if (Math.random() > 0.97) {
      this.updateVelocity();
      this.setAnimation();
    }
    this.x += this.vx;
    this.y += this.vy;
    this.checkBounds();
  }

}
