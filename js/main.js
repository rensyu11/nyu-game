// 全体を組み立てるだけ

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