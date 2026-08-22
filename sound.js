// ============================================================
// sound.js – REGEN & WIND
// ============================================================

let audioCtx = null;
let soundActive = false;
let soundInterval = null;

function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playRain() {
  if (!audioCtx || !soundActive) return;
  const bufferSize = 512;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(Math.random(), 2);
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.06 + Math.random() * 0.04;
  source.connect(gain);
  gain.connect(audioCtx.destination);
  source.start();
  source.stop(audioCtx.currentTime + 0.05);
}

function startSound() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  soundActive = true;
  document.getElementById('btnSound').textContent = '⏸ SOUND';
  document.getElementById('btnSound').classList.add('active');
  for (let i = 0; i < 6; i++) setTimeout(playRain, i * 70);
  soundInterval = setInterval(() => {
    if (soundActive) {
      const count = 2 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) setTimeout(playRain, i * 50 + Math.random() * 30);
    }
  }, 700);
}

function stopSound() {
  soundActive = false;
  if (soundInterval) { clearInterval(soundInterval); soundInterval = null; }
  document.getElementById('btnSound').textContent = '🌧️ SOUND';
  document.getElementById('btnSound').classList.remove('active');
}

function toggleSound() {
  soundActive ? stopSound() : startSound();
}

document.getElementById('btnSound').addEventListener('click', toggleSound);
document.addEventListener('keydown', (e) => {
  if (e.key === 's' || e.key === 'S') toggleSound();
});

console.log('🌧️ sound.js geladen – Regen & Wind');
