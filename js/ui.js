// UI操作だけを担当
// ゲームロジックは書かない

export function updateScore(score) {
  document.getElementById('score').textContent = score;
}

export function updateTime(time) {
  document.getElementById('time').textContent = time;
}

export function updateHighScore(score) {
  document.getElementById('highScore').textContent = score;
}

export function showOverlay(text) {
  const overlay = document.getElementById('overlay');
  overlay.textContent = text;
  overlay.style.display = 'flex';
}

export function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}