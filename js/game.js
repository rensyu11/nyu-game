// ゲーム進行の中枢

import { CONFIG } from './config.js';
import * as UI from './ui.js';
import * as Mole from './mole.js';

export class Game {
  constructor(field) {
    this.field = field;

    this.score = 0;
    this.highScore = 0;
    this.timeLeft = CONFIG.GAME_TIME;
    this.playing = false;
  }

  loadHighScore() {
    this.highScore = Number(localStorage.getItem('highScore')) || 0;
    UI.updateHighScore(this.highScore);
  }

  start() {
    this.reset();
    this.playing = true;

    this.loop();
    this.startTimer();
  }

  loop() {
    if (!this.playing) return;

    Mole.showMole(this.field);

    setTimeout(() => this.loop(), CONFIG.INITIAL_INTERVAL);
  }

  startTimer() {
    const timer = setInterval(() => {
      this.timeLeft--;
      UI.updateTime(this.timeLeft);

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

    const delta = img.dataset.type === 'good' ? 1 : -1;

    this.score += delta;
    UI.updateScore(this.score);

    Mole.clearMoles(this.field);
  }

  end() {
    this.playing = false;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }

    UI.showOverlay(
      `終了！\nスコア: ${this.score}\nハイスコア: ${this.highScore}`
    );
  }

  reset() {
    this.score = 0;
    this.timeLeft = CONFIG.GAME_TIME;

    UI.updateScore(this.score);
    UI.updateTime(this.timeLeft);
    UI.hideOverlay();
  }
}