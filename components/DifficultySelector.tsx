interface DifficultySelectorProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onBack: () => void;
}

export default function DifficultySelector({
  difficulty,
  onSelectDifficulty,
  onBack,
}: DifficultySelectorProps) {
  const difficulties = [
    { value: 'easy' as const, label: 'EASY' },
    { value: 'medium' as const, label: 'MEDIUM' },
    { value: 'hard' as const, label: 'HARD' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-400 mb-4 tracking-widest">DIFFICULTY</h2>
      <div className="flex gap-2 mb-6">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            onClick={() => onSelectDifficulty(diff.value)}
            className={`flex-1 py-2 text-xs font-bold tracking-wider transition-all duration-200 border ${
              difficulty === diff.value
                ? 'bg-white text-black border-white'
                : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
            }`}
          >
            {diff.label}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="w-full py-2 text-xs text-gray-400 border border-gray-600 hover:border-white hover:text-white transition-all duration-200 tracking-widest"
      >
        BACK
      </button>
    </div>
  );
}
