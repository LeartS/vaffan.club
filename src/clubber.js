import createjs from 'createjs-easeljs';


export default class Clubber extends createjs.Sprite {

  constructor(name, spritesheet) {
    super(spritesheet, 'castSpellRight');
    this.name = name;
    this.x = Math.random() * 500;
    this.y = Math.random() * 300;
    this.vx = Math.random() * 10;
    this.vy = 0;
  }

}
