interface GameStatusProps {
  winner: string | null;
  isXNext: boolean;
  gameOver: boolean;
  gameMode: 'ai' | 'friend';
  isBoardFull: boolean;
}

export default function GameStatus({
  winner,
  isXNext,
  gameOver,
  gameMode,
  isBoardFull,
}: GameStatusProps) {
  let statusText = '';
  let statusSubtext = '';

  if (winner) {
    if (gameMode === 'ai') {
      statusText = winner === 'X' ? 'YOU WIN' : 'AI WINS';
    } else {
      statusText = `PLAYER ${winner} WINS`;
    }
  } else if (isBoardFull) {
    statusText = "IT'S A DRAW";
  } else {
    if (gameMode === 'ai') {
      statusText = isXNext ? 'YOUR TURN' : 'AI IS THINKING';
      statusSubtext = isXNext ? '(X)' : '';
    } else {
      statusText = `PLAYER ${isXNext ? 'X' : 'O'}'S TURN`;
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-black tracking-wider mb-1">{statusText}</h2>
      {statusSubtext && <p className="text-xs text-gray-500 tracking-widest">{statusSubtext}</p>}
    </div>
  );
}
