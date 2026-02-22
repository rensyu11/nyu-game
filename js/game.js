// ゲーム進行の中枢

class Game {
  constructor(field) {
    this.field = field;

    this.score = 0;
    this.highScore = 0;
    this.timeLeft = CONFIG.GAME_TIME;
    this.playing = false;
  }

  loadHighScore() {
    this.highScore = Number(localStorage.getItem('highScore')) || 0;
    updateHighScore(this.highScore);
  }

  start() {
    this.reset();
    this.playing = true;

    this.loop();
    this.startTimer();
  }

  loop() {
    if (!this.playing) return;

    showMole(this.field);

    setTimeout(() => this.loop(), CONFIG.INITIAL_INTERVAL);
  }

  startTimer() {
    const timer = setInterval(() => {
      this.timeLeft--;
      updateTime(this.timeLeft);

      if (this.timeLeft <= 0) {
        clearInterval(timer);
        this.end();
      }
    }, 1000);
  }

  hit(hole) {
    if (!this.playing) return;

    const img = hole.querySelector('img');
    if (!img) return;

    const isGood = img.dataset.type === 'good';
    const delta = isGood ? 1 : -1;

    this.score += delta;
    updateScore(this.score);

    clearMoles(this.field);
    this.showEffect(hole, isGood);
  }

  showEffect(hole, isGood) {
    const effect = document.createElement('div');
    effect.className = 'hit-effect ' + (isGood ? 'good' : 'bad');
    effect.textContent = isGood ? '○' : '×';

    hole.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 600);
  }

  end() {
    this.playing = false;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }

    showOverlay(
      `終了！\nスコア: ${this.score}\nハイスコア: ${this.highScore}`
    );
  }

  reset() {
    this.score = 0;
    this.timeLeft = CONFIG.GAME_TIME;

    updateScore(this.score);
    updateTime(this.timeLeft);
    hideOverlay();
  }
}