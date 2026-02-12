export function calculateAIMove(
  board: (string | null)[],
  difficulty: 'easy' | 'medium' | 'hard'
): number {
  const availableMoves = board
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return -1;

  if (difficulty === 'easy') {
    // Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  if (difficulty === 'medium') {
    // 50% chance of best move, 50% random
    if (Math.random() < 0.5) {
      return findBestMove(board);
    } else {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }

  // Hard: Always best move (minimax)
  return findBestMove(board);
}

function findBestMove(board: (string | null)[]): number {
  const availableMoves = board
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null) as number[];

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (let move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = 'O';
    const score = minimax(testBoard, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

function minimax(board: (string | null)[], depth: number, isMaximizing: boolean): number {
  const winner = calculateWinner(board);

  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;

  const availableMoves = board
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'O';
      const score = minimax(testBoard, depth + 1, false);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'X';
      const score = minimax(testBoard, depth + 1, true);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
