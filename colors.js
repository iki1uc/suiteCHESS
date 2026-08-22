// ============================================================
// colors.js – 6 FARBMODI
// ============================================================

const COLORS = {
  gold: { bg: '#1a1a00', border: '#ffaa00', accent: '#ffaa00', title: 'linear-gradient(90deg, #ffaa00, #ffdd88, #ffaa00)' },
  green: { bg: '#0a1a0a', border: '#44ff88', accent: '#44ff88', title: 'linear-gradient(90deg, #44ff88, #88ffbb, #44ff88)' },
  blue: { bg: '#000a1a', border: '#4488ff', accent: '#4488ff', title: 'linear-gradient(90deg, #4488ff, #88bbff, #4488ff)' },
  lila: { bg: '#1a0a1a', border: '#dd88ff', accent: '#dd88ff', title: 'linear-gradient(90deg, #dd88ff, #ffbbff, #dd88ff)' },
  red: { bg: '#1a0a0a', border: '#ff4444', accent: '#ff4444', title: 'linear-gradient(90deg, #ff4444, #ff8888, #ff4444)' },
  white: { bg: '#1a1a1a', border: '#ffffff', accent: '#ffffff', title: 'linear-gradient(90deg, #ffffff, #cccccc, #ffffff)' }
};

let currentColor = 'gold';

function setColor(color) {
  if (!COLORS[color]) return;
  currentColor = color;
  const c = COLORS[color];
  document.body.style.background = c.bg;
  document.getElementById('container').style.borderColor = c.border;
  document.getElementById('container').style.boxShadow = `0 0 60px ${c.border}11`;
  const title = document.getElementById('mainTitle');
  title.style.background = c.title;
  title.style.webkitBackgroundClip = 'text';
  title.style.webkitTextFillColor = 'transparent';
  document.getElementById('detailPanel').style.borderColor = c.border;
  document.querySelector('.board-wrap').style.borderColor = c.border;
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.color-btn[data-color="${color}"]`)?.classList.add('active');
}

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => setColor(btn.dataset.color));
});

setColor('gold');
console.log('🎨 colors.js geladen – 6 Farben');
