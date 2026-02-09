import Link from 'next/link';

type PageFooterProps = {
  /** Show Play Daily / Play Practice buttons (for content pages, not e.g. Privacy). */
  showGameCTAs?: boolean;
};

export default function PageFooter({ showGameCTAs = true }: PageFooterProps) {
  return (
    <footer className="mt-16 pt-10 border-t border-gray-800">
      {showGameCTAs && (
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-4">Play the game</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/game"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Play Daily
            </Link>
            <Link
              href="/game?practice=true"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Play Practice
            </Link>
          </div>
        </div>
      )}
      <nav className="text-sm text-gray-500" aria-label="Footer">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/game" className="hover:text-white transition-colors">Daily</Link>
          <Link href="/game?practice=true" className="hover:text-white transition-colors">Practice</Link>
          <Link href="/archive" className="hover:text-white transition-colors">Archive</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/how-to-play" className="hover:text-white transition-colors">How to play</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </div>
      </nav>
    </footer>
  );
}
