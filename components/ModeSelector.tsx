interface ModeSelectorProps {
  onSelectMode: (mode: 'ai' | 'friend') => void;
}

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-20">
      <div className="mb-16 text-center">
        <h1 className="text-6xl font-black mb-2 text-white">TIC TAC TOE</h1>
        <p className="text-sm text-gray-400 tracking-widest">MINIMALIST GAME</p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <button
          onClick={() => onSelectMode('ai')}
          className="w-full py-8 px-6 border border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg tracking-wide"
        >
          PLAY VS AI
        </button>
        <button
          onClick={() => onSelectMode('friend')}
          className="w-full py-8 px-6 border border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg tracking-wide"
        >
          PLAY VS FRIEND
        </button>
      </div>
    </div>
  );
}
