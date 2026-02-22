// UI操作だけを担当

function updateScore(score) {
  document.getElementById('score').textContent = score;
}

function updateTime(time) {
  document.getElementById('time').textContent = time;
}

function updateHighScore(score) {
  document.getElementById('highScore').textContent = score;
}

function showOverlay(text) {
  const overlay = document.getElementById('overlay');
  overlay.textContent = text;
  overlay.style.display = 'flex';
}

function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}