// モグラの生成・削除だけ担当

import { CONFIG } from './config.js';

export function createHoles(field, onClick) {
  for (let i = 0; i < CONFIG.HOLE_COUNT; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    hole.addEventListener('click', () => onClick(hole));
    field.appendChild(hole);
  }
}

export function showMole(field) {
  clearMoles(field);

  const holes = field.querySelectorAll('.hole');
  const hole = holes[Math.floor(Math.random() * holes.length)];

  const img = document.createElement('img');
  const isBad = Math.random() < CONFIG.BAD_RATE;

  img.src = isBad ? 'images/bad.png' : 'images/good.png';
  img.dataset.type = isBad ? 'bad' : 'good';
  img.className = 'mole';

  hole.appendChild(img);

  setTimeout(() => clearMoles(field), CONFIG.INITIAL_DURATION);
}

export function clearMoles(field) {
  field.querySelectorAll('.hole').forEach(h => h.innerHTML = '');
}