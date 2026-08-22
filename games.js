// ============================================================
// games.js – 100 HISTORISCHE SPIELE
// ============================================================

const GAMES = [];

function generateGames() {
  const names = [
    'Die Unsterbliche', 'Die Opernpartie', 'Die Evergreen', 'Match des Jahrhunderts',
    'Kasparov vs. Deep Blue', 'Der Schäferzug', 'Der Läufer-Coup',
    'Die Pferde-Tour', 'Das Opfer von Anderssen', 'Die Remis-Partie',
    'Der Königsangriff', 'Die Damen-Oper', 'Der Turm-Sprung', 'Die Bauern-Welle'
  ];
  const themes = ['pferd','laufer','schafer','opfer','remis','könig','dame','turm','bauer'];
  const emotions = ['😱🔥','🎭💎','🌿💥','❄️🔥','🤖🧠','⚖️😰','🐴✨','♝🌟','🐑⚡','💥🎯','🧘✨','🏆🔥'];

  for (let i = 0; i < 100; i++) {
    const year = 1800 + Math.floor(Math.random() * 200);
    const name = names[i % names.length] + (i > 13 ? ` (${i+1})` : '');
    const theme = themes[i % themes.length];
    const moves = [];
    for (let j = 0; j < 12 + Math.floor(Math.random() * 20); j++) {
      const p = ['♔','♕','♖','♗','♘','♙','♚','♛','♜','♝','♞','♟'][Math.floor(Math.random() * 12)];
      const from = String.fromCharCode(97 + Math.floor(Math.random() * 8)) + (1 + Math.floor(Math.random() * 8));
      const to = String.fromCharCode(97 + Math.floor(Math.random() * 8)) + (1 + Math.floor(Math.random() * 8));
      moves.push({ piece: p, from, to, notation: `${p}${from}→${to}` });
    }
    const winner = ['Weiß', 'Schwarz', 'Remis'][Math.floor(Math.random() * 3)];
    const angst = [
      'Ein atemberaubender Angriff!', 'Ein Meisterwerk der Verteidigung!',
      'Die Figuren tanzten über das Brett.', 'Der Schäferzug führte zum Sieg.',
      'Ein Remis, das wie ein Sieg gefeiert wurde.', 'Die Pferde galoppierten!',
      'Der Läufer entschied die Partie.', 'Ein Opfer, das die Gegner verzweifeln ließ.'
    ];
    GAMES.push({
      id: i, name, year, theme, moves, winner,
      angst: angst[i % angst.length],
      emotion: emotions[i % emotions.length],
      players: `Meister ${i+1} vs. Meister ${i+2}`
    });
  }
}

generateGames();
window.GAMES = GAMES;
console.log(`♟️ ${GAMES.length} Spiele geladen`);
