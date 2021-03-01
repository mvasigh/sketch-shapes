import p5 from "p5";

const WIDTH = 720;
const HEIGHT = 720;
const TILE_SIZE = WIDTH / 18;
const TILE_PADDING = 8;
const MIN_LEVELS = 1;
const MAX_LEVELS = 5;
const SKIP_CHANCE = 0.2;
const STROKE_WIDTH = 4;

const ROWS = HEIGHT / TILE_SIZE;
const COLS = WIDTH / TILE_SIZE;

// Utility functions
function mapRange(input, inputMin, inputMax, outputMin, outputMax) {
  const range = inputMax - inputMin;
  const frac = (input - inputMin) / range;
  return outputMin + frac * (outputMax - outputMin);
}

/** @type {(p: p5) => void} */
export default (p) => {
  const border = (x, y, w, h, lvl, off) => {
    const p1 = TILE_PADDING * lvl;
    const p2 = TILE_PADDING * lvl * 2;
    const _x = x + p1;
    const _y = y + p1;
    const _w = w - p2;
    const _h = h - p2;
    let stroke = off <= 0 ? 190 : mapRange(off, 0, 10, 0, 170);
    p.stroke(stroke);
    p.rect(x + p1 + off, y + p1 + off, w - p2 + off, h - p2 + off);
  };

  const tile = (x, y, w, h) => {
    const levels = Math.floor(p.random(MIN_LEVELS, MAX_LEVELS));
    for (let i = levels; i > MIN_LEVELS; i--) {
      if (Math.random() > SKIP_CHANCE) {
        for (let off = 10; off >= 0; off -= 0.5) {
          border(x, y, w, h, i + 1, off);
        }
      }
    }
  };

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background(0);
    p.stroke(240);
    p.strokeWeight(STROKE_WIDTH);
    p.noFill();
  };

  let clearing = false;
  p.draw = () => {
    if (p.frameCount % 180 === 0) {
      clearing = false;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          let x = col * TILE_SIZE;
          let y = row * TILE_SIZE;
          tile(x, y, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    if ((p.frameCount + 80) % 180 === 0) {
      clearing = true;
    }

    if (clearing) {
      p.noStroke();
      p.fill(0, 0, 0, 5);
      p.rect(0, 0, WIDTH, HEIGHT);
    }
  };
};
