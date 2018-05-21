// Spritesheet image actions and how many frames they take
export const actions = [
  ['spellcast', 7],
  ['thrust', 8],
  ['walk', 9],
  ['slash', 6],
  ['shoot', 13],
  // ['trip', 6],
];

export const framesPerRow = 13;
export const frameSettings = {
  width: 64,
  height: 64,
  regX: 32,
  regY: 0,
  spacing: 0,
  margin: 0
}

// Model coordinate system dimensions
// This must match the width and height attributes of the <canvas> element
export const modelWidth = 600;
export const modelHeight = 400;
