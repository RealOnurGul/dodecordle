import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { getGuide } from '@/lib/guidesMeta';

export async function generateMetadata() {
  const guide = getGuide('dodecordle-strategy');
  return {
    title: guide ? `${guide.title} | Dodecordle Guides` : 'Guides | Dodecordle',
    description: guide?.description,
  };
}

export default function DodecordleStrategyPage() {
  const guide = getGuide('dodecordle-strategy')!;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{guide.title}</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              In Dodecordle you solve 12 words with one guess per turn. The same guess is checked against every word, so your strategy has to account for all 12 grids at once. This guide covers how to use each guess effectively, when to focus on one word versus many, and how to finish within the 14-guess limit. If you are new to the game, read <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> first; then use the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game to try these ideas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Make Every Guess Count for Multiple Words</h2>
            <p>
              In Wordle you only need to help one word. In Dodecordle a good guess gives information across as many of the 12 words as possible. Prefer words that use common letters and spread them across different positions. That way one guess narrows options in several columns, not just one or two.
            </p>
            <p>
              After your first two guesses, look at which grids still have the most uncertainty. If one word has several greens and only one or two letters left, you might use a “dedication” guess aimed mainly at that word. But if most grids are still open, choose a word that tests letters you have not yet tried in positions that are still gray or yellow in many columns. Balance between locking in one word and making progress everywhere.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">When to Narrow One Word vs. Many</h2>
            <p>
              Early on (guesses 1–4), aim for breadth. Use openers and follow-ups that hit many letters and positions so you learn something about most or all of the 12 words. Once you have a few greens and yellows, you will see that some words are close to solved and others are not.
            </p>
            <p>
              When a word has only one or two blanks left and you know which letters go there, it can be worth a guess that solves that word even if it does not help others much. That frees your mind and sometimes reveals a letter that helps elsewhere. Do not overdo it: if you spend three guesses solving three different words one at a time, you may run out of turns for the remaining nine. Mix dedicated solves with guesses that still help multiple grids.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Using the Keyboard and Grid</h2>
            <p>
              The on-screen keyboard summarizes results across all 12 words. A letter is green if it is correct in at least one word, yellow if it appears but in the wrong place in at least one, and gray only if it is not in any of the 12 words. Use that to avoid repeating dead letters and to spot which letters are still in play. Scanning the grid by column (one word’s history) and by row (one guess’s effect on all words) helps you decide the next guess. For more on letter frequency and patterns, see our guide on <Link href="/guides/word-patterns-and-letter-frequency" className="text-blue-400 hover:text-blue-300 underline">word patterns and letter frequency</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Managing the Guess Limit</h2>
            <p>
              You have 14 guesses. The first few should be high-information words that apply to all 12. By the middle of the game you want a mix: some guesses that solve or nearly solve one word, others that eliminate possibilities in several. In the last few guesses, prioritize words that are still open; do not waste a turn on a word you have already solved. If you find yourself often running out of guesses, try a stronger opener (we have a guide on <Link href="/guides/best-opening-words" className="text-blue-400 hover:text-blue-300 underline">best opening words</Link>) and avoid the <Link href="/guides/mistakes-to-avoid" className="text-blue-400 hover:text-blue-300 underline">common mistakes</Link> that waste turns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">How many guesses do I get in Dodecordle?</h3>
                <p>You get 14 guesses to solve all 12 words in both the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> and <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> games.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Should I use the same opening word every time?</h3>
                <p>Using a consistent opener (e.g. one with many common letters) makes it easier to compare games and build intuition. You can also rotate a few openers if you like variety; what matters is that the word is information-rich.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Is it better to solve one word at a time or spread guesses?</h3>
                <p>Early on, spread: aim for guesses that help many words. Later, it is fine to spend a guess or two finishing a single word if it is close, as long as you still have enough turns left for the rest.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I play?</h3>
                <p>Play the daily puzzle at <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> and unlimited games at <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link>. More info is on our <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> and <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> pages.</p>
              </div>
            </div>
          </section>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
