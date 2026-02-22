// 全体を組み立てるだけ
// ロジックは書かない

import { Game } from './game.js';
import { createHoles } from './mole.js';

const field = document.getElementById('field');

const game = new Game(field);

createHoles(field, hole => game.hit(hole));
game.loadHighScore();

document.getElementById('startBtn')
  .addEventListener('click', () => game.start());

document.getElementById('resetBtn')
  .addEventListener('click', () => game.reset());

document.getElementById('overlay')
  .addEventListener('click', () => game.reset());