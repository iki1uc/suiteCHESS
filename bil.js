// ============================================================
// bil.js – HISTORY CHESS ENGINE
// ============================================================

const canvas = document.getElementById('chessCanvas');
const ctx = canvas.getContext('2d');

let boardState = [];
let currentGame = null;
let moveIndex = 0;
let autoMode = false;
let autoInterval = null;
let selected = null;
let allGames = [];
let filteredGames = [];

function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height, 480);
  canvas.width = size;
  canvas.height = size;
  renderBoard();
}
window.addEventListener('resize', resizeCanvas);

function initBoard() {
  boardState = [];
  const backRankW = ['♖','♘','♗','♕','♔','♗','♘','♖','♙'];
  const backRankB = ['♜','♞','♝','♛','♚','♝','♞','♜','♟'];
  for (let r = 0; r < 9; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) {
      let p = null, col = null;
      if (r === 1) { p = '♙'; col = 'white'; }
      else if (r === 7) { p = '♟'; col = 'black'; }
      else if (r === 0) { p = backRankW[c]; col = 'white'; if (c === 8) { p = '♙'; col = 'white'; } }
      else if (r === 8) { p = backRankB[c]; col = 'black'; if (c === 8) { p = '♟'; col = 'black'; } }
      else { p = null; col = null; }
      row.push({ piece: p, color: col });
    }
    boardState.push(row);
  }
}

function applyMoveToBoard(move) {
  const fromFile = move.from.charCodeAt(0) - 97;
  const fromRank = 8 - parseInt(move.from[1]);
  const toFile = move.to.charCodeAt(0) - 97;
  const toRank = 8 - parseInt(move.to[1]);
  if (fromRank >= 0 && fromRank < 9 && fromFile >= 0 && fromFile < 9 &&
      toRank >= 0 && toRank < 9 && toFile >= 0 && toFile < 9) {
    const piece = boardState[fromRank][fromFile];
    boardState[toRank][toFile] = piece;
    boardState[fromRank][fromFile] = { piece: null, color: null };
  }
}

function renderBoard() {
  const w = canvas.width, h = canvas.height, cellSize = w / 9;
  ctx.clearRect(0, 0, w, h);
  const grad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w/2);
  grad.addColorStop(0, '#1a1a2a');
  grad.addColorStop(1, '#0a0a12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const x = c * cellSize, y = r * cellSize;
      const isLight = (r + c) % 2 === 0;
      ctx.fillStyle = isLight ? 'rgba(50,70,70,0.25)' : 'rgba(20,35,35,0.25)';
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.strokeStyle = 'rgba(60,120,100,0.05)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, cellSize, cellSize);
      const piece = boardState[r]?.[c];
      if (piece && piece.piece) {
        ctx.font = `${cellSize * 0.7}px 'Segoe UI', 'Arial Unicode MS', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(100,200,180,0.05)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = piece.color === 'white' ? '#ddeeee' : '#223333';
        ctx.fillText(piece.piece, x + cellSize/2, y + cellSize/2 + 2);
        ctx.shadowBlur = 0;
      }
    }
  }
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i < 9; i++) {
    ctx.fillText(String.fromCharCode(97 + i), i * cellSize + cellSize/2, 2);
  }
  ctx.textBaseline = 'bottom';
  for (let i = 0; i < 9; i++) {
    ctx.fillText(String(9 - i), 2, i * cellSize + cellSize/2);
  }
  if (selected) {
    const [sr, sc] = selected;
    ctx.fillStyle = 'rgba(60,180,160,0.12)';
    ctx.fillRect(sc * cellSize, sr * cellSize, cellSize, cellSize);
    ctx.strokeStyle = 'rgba(60,200,180,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(sc * cellSize, sr * cellSize, cellSize, cellSize);
  }
}

function loadGame(game) {
  currentGame = game;
  moveIndex = 0;
  initBoard();
  selected = null;
  document.getElementById('detailPanel').innerHTML = `
    <span class="highlight">📜 ${game.name}</span><br>
    ${game.year} · ${game.players}<br>
    <span class="highlight">🏆 ${game.winner}</span><br>
    <span style="color:#666;font-size:10px;">${game.angst}</span><br>
    <span class="move-text">${game.moves.length} Züge</span>
  `;
  document.getElementById('total-moves').textContent = game.moves.length;
  document.getElementById('move-count').textContent = '0';
  renderBoard();
  updateStatus();
  if (game.moves.length > 0) setTimeout(() => nextMove(), 300);
}

function nextMove() {
  if (!currentGame || moveIndex >= currentGame.moves.length) {
    if (autoMode) { clearInterval(autoInterval); autoInterval = null; document.getElementById('btnAuto').textContent = '▶ AUTO'; autoMode = false; }
    return;
  }
  const move = currentGame.moves[moveIndex];
  applyMoveToBoard(move);
  moveIndex++;
  document.getElementById('move-count').textContent = moveIndex;
  document.getElementById('turn-indicator').textContent = moveIndex % 2 === 0 ? 'Weiß' : 'Schwarz';
  const detail = document.getElementById('detailPanel');
  const moveText = move.notation || `${move.piece}${move.from}→${move.to}`;
  detail.innerHTML = `
    <span class="highlight">📜 ${currentGame.name}</span><br>
    ${currentGame.year} · ${currentGame.players}<br>
    <span class="move-text">Zug ${moveIndex}/${currentGame.moves.length}: ${moveText}</span><br>
    <span style="color:#666;font-size:10px;">${currentGame.angst}</span>
  `;
  renderBoard();
  updateStatus();
  if (autoMode && moveIndex < currentGame.moves.length) {
    setTimeout(nextMove, 900);
  } else if (autoMode && moveIndex >= currentGame.moves.length) {
    clearInterval(autoInterval);
    autoInterval = null;
    document.getElementById('btnAuto').textContent = '▶ AUTO';
    autoMode = false;
    detail.innerHTML += `<br><span style="color:#ffaa00;">🏆 PARTIE BEENDET!</span>`;
  }
}

function updateStatus() {
  document.getElementById('turn-indicator').textContent = moveIndex % 2 === 0 ? 'Weiß' : 'Schwarz';
}

function resetGame() {
  if (autoMode) { clearInterval(autoInterval); autoInterval = null; document.getElementById('btnAuto').textContent = '▶ AUTO'; autoMode = false; }
  initBoard();
  moveIndex = 0;
  selected = null;
  renderBoard();
  updateStatus();
  document.getElementById('move-count').textContent = '0';
  document.getElementById('detailPanel').innerHTML = `<span class="highlight">⟲ Zurückgesetzt</span>`;
}

function renderList() {
  const list = document.getElementById('gameList');
  list.innerHTML = '';
  filteredGames.forEach(game => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <div>
        <div class="name">${game.name}</div>
        <div class="year">${game.year} · ${game.players}</div>
      </div>
      <div class="emotion">${game.emotion}</div>
    `;
    item.addEventListener('click', () => loadGame(game));
    list.appendChild(item);
  });
}

function loadGames(games) {
  allGames = games || window.GAMES || [];
  filteredGames = [...allGames];
  renderList();
  if (allGames.length > 0) loadGame(allGames[0]);
}

// EXPOSE
window.loadGames = loadGames;
window.nextMove = nextMove;
window.resetGame = resetGame;
window.renderBoard = renderBoard;
window.resizeCanvas = resizeCanvas;

// EVENTS
document.getElementById('btnStep').addEventListener('click', nextMove);
document.getElementById('btnAuto').addEventListener('click', function() {
  if (autoMode) {
    clearInterval(autoInterval);
    autoInterval = null;
    this.textContent = '▶ AUTO';
    autoMode = false;
    return;
  }
  if (!currentGame) { if (filteredGames.length > 0) loadGame(filteredGames[0]); else return; }
  autoMode = true;
  this.textContent = '⏸ STOP';
  if (moveIndex === 0) nextMove();
  else if (moveIndex < currentGame.moves.length) nextMove();
  else loadGame(currentGame);
});
document.getElementById('btnReset').addEventListener('click', resetGame);

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); nextMove(); }
  if (e.key === 'r' || e.key === 'R') resetGame();
  if (e.key === 'a' || e.key === 'A') document.getElementById('btnAuto').click();
});

console.log('♟️ bil.js geladen – HISTORY CHESS ENGINE');
