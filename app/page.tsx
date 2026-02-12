'use client';

import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import ModeSelector from '@/components/ModeSelector';
import DifficultySelector from '@/components/DifficultySelector';
import Footer from '@/components/Footer';

export default function Home() {
  const [gameMode, setGameMode] = useState<'ai' | 'friend' | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-4 pb-28">
  <div className="w-full max-w-md flex flex-col flex-grow flex-shrink-0">
        {!gameMode ? (
          <ModeSelector onSelectMode={setGameMode} />
        ) : gameMode === 'ai' ? (
          <>
            <DifficultySelector
              difficulty={difficulty}
              onSelectDifficulty={setDifficulty}
              onBack={() => setGameMode(null)}
            />
            <GameBoard gameMode="ai" difficulty={difficulty} onReset={() => setGameMode(null)} />
          </>
        ) : (
          <GameBoard gameMode="friend" difficulty="medium" onReset={() => setGameMode(null)} />
        )}
      </div>
      <Footer />
    </main>
  );
}
