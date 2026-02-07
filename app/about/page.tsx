import Link from 'next/link';

export const metadata = {
  title: 'About Dodecordle | 12 Word Wordle & Daily Word Puzzle',
  description:
    'Learn about Dodecordle: the wordle alternative where you solve 12 words at once. Our daily word puzzle and practice mode, and why we built this word game.',
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

export default function AboutPage() {
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

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">About Dodecordle</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Dodecordle is a free online word puzzle that asks you to solve 12 Wordle-style words in one game. If you enjoy Wordle and want a harder daily word puzzle, Dodecordle is built for you: one guess applies to all 12 hidden words, and you use the same green, yellow, and gray feedback to solve every grid. It is one of the most challenging wordle alternatives that still uses the familiar Wordle rules.
            </p>
            <p>
              We built Dodecordle for players who love word games and want more than a single word per day. You get a shared daily word puzzle that everyone can play and compare, plus an unlimited practice word puzzle so you can play as many rounds as you like. No account is required—you can start from the <Link href="/" className="text-blue-400 hover:text-blue-300 underline">home page</Link> or jump straight into the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">What Makes Dodecordle Different</h2>
            <p>
              In classic Wordle you solve one five-letter word per day. In Dodecordle you solve 12. The twist is that every guess you type is checked against all 12 words at once. So instead of 12 separate games, you are playing one game with 12 columns of feedback. That makes it a true 12 word wordle: one puzzle, one set of guesses, 12 answers to find.
            </p>
            <p>
              The daily word puzzle resets once per day (at midnight in your time zone) and is the same for all players. That shared experience makes it easy to compare results with friends or to aim for a personal best. The practice word puzzle does not reset on a schedule; each game is a new random set of 12 words, so you can keep playing when you want more.
            </p>
            <p>
              We keep the interface simple: a grid, an on-screen keyboard, and the same color logic you already know. No extra rules, no timers—just you and the words. For full rules and tips, see our <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Who Is Dodecordle For?</h2>
            <p>
              Dodecordle is for anyone who likes word games and wants a step up from a single daily word. If you finish Wordle quickly and wish there were more words, or if you want a wordle alternative that stays in the same family but increases the challenge, the 12 word wordle format is designed for you.
            </p>
            <p>
              Teachers and parents can use the daily word puzzle as a fun vocabulary or spelling activity. Practice mode is useful for repeated play without waiting for the next day. Because the game is free and runs in the browser, you can try it on any device without installing anything. We do not require sign-up; you can play the daily word puzzle and the practice word puzzle as a guest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Our Approach to the Game</h2>
            <p>
              We wanted a word puzzle that felt familiar but offered more depth. Wordle proved that a simple daily word puzzle could become a habit; we wanted to keep that clarity while giving players more to solve in one sitting. Dodecordle uses the same dictionary and color feedback so the skills you already have transfer directly.
            </p>
            <p>
              We also wanted to support both casual and serious players. The daily game gives you one shared puzzle to talk about with others. The practice word puzzle gives you unlimited games for learning strategies or just playing more. Both modes use the same 14-guess limit per game so the difficulty is consistent.
            </p>
            <p>
              We care about privacy too. You can read how we handle data and third-party services (such as analytics and ads) on our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What is Dodecordle?</h3>
                <p>
                  Dodecordle is a free word puzzle where you solve 12 five-letter words in one game. Each guess is checked against all 12 words, and you get separate color feedback for each, making it a 12 word wordle experience.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Is Dodecordle related to Wordle?</h3>
                <p>
                  Dodecordle is inspired by Wordle and uses the same style of feedback (green, yellow, gray) and five-letter words. It is an independent wordle alternative that multiplies the challenge by using 12 words per game.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Do I need an account to play?</h3>
                <p>
                  No. You can play the daily word puzzle and the practice word puzzle without creating an account or signing in. Just open the <Link href="/" className="text-blue-400 hover:text-blue-300 underline">home page</Link> and choose Daily or Practice.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What is the difference between Daily and Practice?</h3>
                <p>
                  Daily is one puzzle per day, shared with everyone. Practice gives you unlimited games with new random words each time. Both use 14 guesses per game. You can start the daily game <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">here</Link> and practice <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">here</Link>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">When does the daily puzzle change?</h3>
                <p>
                  The daily word puzzle resets at midnight in your local time zone. After that, a new set of 12 words is available for the next day.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Is Dodecordle free?</h3>
                <p>
                  Yes. Dodecordle is free to play. You can play the daily word puzzle and the practice word puzzle as much as you want with no subscription or payment.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I learn how to play?</h3>
                <p>
                  For full rules, tips, and strategies, see our <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> page.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">How do you use my data?</h3>
                <p>
                  We explain our use of data and third-party services in our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link>. We do not require an account, so we do not collect account data; any collection is described there.
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
