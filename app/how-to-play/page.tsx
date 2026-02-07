import Link from 'next/link';

export const metadata = {
  title: 'How to Play Dodecordle | 12 Word Wordle Guide',
  description:
    'Learn how to play Dodecordle: the word puzzle where you solve 12 Wordles at once. Rules, tips, and FAQs for the daily word puzzle and practice mode.',
};

function NavLinks() {
  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-6">
      <Link href="/" className="hover:text-white transition-colors">Home</Link>
      <Link href="/game" className="hover:text-white transition-colors">Daily</Link>
      <Link href="/game?practice=true" className="hover:text-white transition-colors">Practice</Link>
      <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
    </nav>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-3 my-6">
      <Link
        href="/game"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
      >
        Play Daily
      </Link>
      <Link
        href="/game?practice=true"
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
      >
        Play Practice
      </Link>
    </div>
  );
}

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-300 hover:text-white transition-colors mb-4"
          >
            <span className="text-2xl sm:text-3xl">←</span>
            <span>Go back to home</span>
          </Link>
        </div>
        <NavLinks />
        <CTAButtons />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">How to Play Dodecordle</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Dodecordle is a free daily word puzzle that challenges you to solve 12 Wordle-style puzzles at the same time. If you love Wordle and want a bigger challenge, Dodecordle is the wordle alternative that doubles down: one guess applies to all 12 hidden words, and you use the same color feedback to narrow down every grid at once.
            </p>
            <p>
              Whether you play the daily word puzzle or the unlimited practice word puzzle, the rules are the same. This guide explains how the game works, how to use feedback across all 12 words, and how to get the most out of both game modes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">How Dodecordle Works</h2>
            <p>
              In Dodecordle you guess one 5-letter word per turn. That single guess is checked against all 12 target words. Each of the 12 grids shows its own feedback for that guess, so you learn something about every word at once.
            </p>
            <p>
              The feedback uses the same colors as Wordle: green means the letter is in the correct position in that word, yellow means the letter is in the word but in another position, and gray means the letter is not in that word at all. Because one guess gives you 12 sets of clues, you can eliminate possibilities quickly if you choose words that test many letters.
            </p>
            <p>
              You have a limited number of guesses (14 in the standard game). Your goal is to solve all 12 words before you run out. There is no penalty for wrong guesses beyond using a turn; the challenge is efficiency and logic across all grids.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Daily Game vs Practice Mode</h2>
            <p>
              The daily word puzzle (Daily Game) is the same set of 12 words for everyone that day. You get one puzzle per day and 14 guesses to complete it. It resets at midnight in your time zone, so you can compare results with friends or try to beat your own best.
            </p>
            <p>
              The practice word puzzle (Practice Mode) gives you unlimited games. Each game uses a new random set of 12 words. Practice mode is ideal for learning strategies, testing opening words, or just playing more when you want another round without waiting for the next day.
            </p>
            <p>
              Both modes use the same rules and feedback. The only difference is whether the puzzle is the shared daily one or a random practice puzzle. You can switch between them from the <Link href="/" className="text-blue-400 hover:text-blue-300 underline">home page</Link> or use the links at the top and bottom of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Choosing Your First Guesses</h2>
            <p>
              A strong first guess uses common letters and spreads them across the word. Many players use words like CRANE, SLATE, or ROATE because they pack in vowels and frequent consonants. One such guess gives you information on all 12 words at once.
            </p>
            <p>
              After the first guess, look for patterns. If a letter is green in the same position in several grids, those words share that letter there. If a letter is yellow in one grid and gray in another, you know which words contain it and which do not. Use that to choose your next guess so it helps as many grids as possible.
            </p>
            <p>
              Sometimes you will solve one or two words early. Keep using the remaining guesses to narrow down the rest. There is no need to type a word you have already solved; focus on the grids that still need work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Using the Keyboard and Grid</h2>
            <p>
              The on-screen keyboard shows which letters are unused (gray), used but wrong position (yellow), or correct (green) based on all 12 words. This summary helps you avoid repeating letters that cannot appear and reminds you which letters are still in play.
            </p>
            <p>
              Each row of the grid is one guess. The 12 columns are the 12 target words. Scan across a row to see how one guess performed in every word. Looking down a column shows the history of feedback for that single word. Using both views makes it easier to plan the next guess.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What is Dodecordle?</h3>
                <p>
                  Dodecordle is a word puzzle game where you solve 12 five-letter words at the same time. Each guess you make is checked against all 12 words, and you get separate color feedback for each word, like a 12-in-1 Wordle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">How many guesses do I get?</h3>
                <p>
                  In the daily word puzzle you get 14 guesses to find all 12 words. In practice mode the limit is the same per game, but you can start a new game anytime for another 14 guesses.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Do I have to use a real word for every guess?</h3>
                <p>
                  Yes. Each guess must be a valid five-letter word. The game will not accept invalid or non-dictionary words.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Can the same word be the answer in more than one grid?</h3>
                <p>
                  No. All 12 target words in a single game are different. You will never have the same word twice in one puzzle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What is the difference between Daily and Practice?</h3>
                <p>
                  Daily is one shared puzzle per day for everyone; Practice gives you unlimited random puzzles. Both use the same rules and 14 guesses per game. You can play Daily from the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">game page</Link> and Practice via the same page with practice mode enabled.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Is Dodecordle free?</h3>
                <p>
                  Yes. Dodecordle is free to play in your browser. No account is required for the daily word puzzle or the practice word puzzle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">When does the daily puzzle reset?</h3>
                <p>
                  The daily puzzle resets at midnight in your local time zone. After that you get a new set of 12 words for the next day.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I read your privacy policy?</h3>
                <p>
                  You can read how we handle data and cookies on our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> page.
                </p>
              </div>
            </div>
          </section>
        </div>

        <CTAButtons />
        <NavLinks />
      </div>
    </div>
  );
}
