import {modelWidth, modelHeight} from './constants.js';


export const modelToDisplay = ([x, y], stage) => {
  return [x * stage.canvas.clientX / modelWidth, y * stage.canvas.clientY / modelHeight];
}
