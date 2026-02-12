interface GameSquareProps {
  value: string | null;
  onClick: () => void;
}

export default function GameSquare({ value, onClick }: GameSquareProps) {
  return (
    <button
      onClick={onClick}
      className="aspect-square bg-zinc-900 border border-gray-800 hover:border-white text-white font-black text-4xl transition-all duration-300 hover:bg-zinc-800 cursor-pointer"
    >
      {value}
    </button>
  );
}
