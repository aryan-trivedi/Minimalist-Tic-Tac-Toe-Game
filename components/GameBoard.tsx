'use client';

import { useState, useEffect } from 'react';
import GameSquare from './GameSquare';
import GameStatus from './GameStatus';
import { calculateAIMove } from '@/lib/aiLogic';

interface GameBoardProps {
  gameMode: 'ai' | 'friend';
  difficulty: 'easy' | 'medium' | 'hard';
  onReset: () => void;
}

export default function GameBoard({ gameMode, difficulty, onReset }: GameBoardProps) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]): string | null => {
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
  };

  const isBoardFull = (squares: (string | null)[]): boolean => {
    return squares.every((square) => square !== null);
  };

  // AI move effect
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !gameOver) {
      const timer = setTimeout(() => {
        const aiMoveIndex = calculateAIMove(board, difficulty);
        if (aiMoveIndex !== -1) {
          const newBoard = [...board];
          newBoard[aiMoveIndex] = 'O';
          setBoard(newBoard);

          const gameWinner = calculateWinner(newBoard);
          if (gameWinner) {
            setWinner(gameWinner);
            setGameOver(true);
          } else if (isBoardFull(newBoard)) {
            setGameOver(true);
          } else {
            setIsXNext(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, board, gameOver, difficulty]);

  const handleSquareClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (isBoardFull(newBoard)) {
      setGameOver(true);
    } else {
      if (gameMode === 'ai') {
        setIsXNext(false);
      } else {
        setIsXNext(!isXNext);
      }
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <GameStatus
        winner={winner}
        isXNext={isXNext}
        gameOver={gameOver}
        gameMode={gameMode}
        isBoardFull={isBoardFull(board)}
      />

      <div className="grid grid-cols-3 gap-2 w-full aspect-square max-w-sm">
        {board.map((value, index) => (
          <GameSquare
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={handleReset}
          className="flex-1 py-3 border border-white text-white font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 text-sm"
        >
          NEW GAME
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3 border border-gray-600 text-gray-400 font-semibold tracking-wider hover:border-white hover:text-white transition-all duration-300 text-sm"
        >
          MENU
        </button>
      </div>
    </div>
  );
}
