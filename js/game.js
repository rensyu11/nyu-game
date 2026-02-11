const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const overlay = document.getElementById('overlay');

const GOOD_IMG = 'images/good.png';
const BAD_IMG = 'images/bad.png';

let score = 0;
let timeLeft = 30;
let gameTimer = null;
let moleTimer = null;
let activeHole = null;
let active = false;
let playing = false;

function clearMole() {
  holes.forEach(h => h.innerHTML = '');
  active = false;
  activeHole = null;
}

function showMole() {
  if (!playing) return;

  clearMole();

  const hole = holes[Math.floor(Math.random() * holes.length)];
  const img = document.createElement('img');

  const isBad = Math.random() < 0.2;
  img.src = isBad ? BAD_IMG : GOOD_IMG;
  img.dataset.type = isBad ? 'bad' : 'good';
  img.classList.add('mole');

  hole.appendChild(img);
  activeHole = hole;
  active = true;

  setTimeout(clearMole, 900);
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (!playing || !active || hole !== activeHole) return;

    const img = hole.querySelector('img');
    if (!img) return;

    const delta = img.dataset.type === 'good' ? 1 : -1;

    score += delta;
    scoreEl.textContent = score;

    // スコア欄をフラッシュさせる
    scoreEl.classList.remove('flash-plus', 'flash-minus');
    void scoreEl.offsetWidth; // 再描画トリガ
    scoreEl.classList.add(delta > 0 ? 'flash-plus' : 'flash-minus');

    clearMole();

  });
});


function endGame() {
  playing = false;
  clearInterval(gameTimer);
  clearInterval(moleTimer);
  clearMole();

  // overlay にスコアを表示
  overlay.textContent = `終了！\nスコア: ${score}`;
  overlay.style.display = 'flex';
}

function resetGame() {
  playing = false;
  clearInterval(gameTimer);
  clearInterval(moleTimer);
  clearMole();

  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  overlay.style.display = 'none';
}

function startGame() {
  resetGame();
  playing = true;

  moleTimer = setInterval(showMole, 1000);

  gameTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// 終了画面クリックで初期画面へ
overlay.addEventListener('click', resetGame);

function showScoreEffect(hole, value) {
  const el = document.createElement('div');
  el.className = 'score-float ' + (value > 0 ? 'plus' : 'minus');
  el.textContent = value > 0 ? `+${value}` : `${value}`;

  hole.appendChild(el);

  setTimeout(() => el.remove(), 500);
}
