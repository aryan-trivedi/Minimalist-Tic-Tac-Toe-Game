export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black p-4 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-xs">
        <a
          href="https://x.com/aryannnnnn95"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          Twitter
        </a>
        <span className="text-gray-700">•</span>
        <a
          href="https://github.com/aryan-trivedi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
