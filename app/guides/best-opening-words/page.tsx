import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { getGuide } from '@/lib/guidesMeta';

export async function generateMetadata() {
  const guide = getGuide('best-opening-words');
  return {
    title: guide ? `${guide.title} | Dodecordle Guides` : 'Guides | Dodecordle',
    description: guide?.description,
  };
}

export default function BestOpeningWordsPage() {
  const guide = getGuide('best-opening-words')!;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{guide.title}</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Your first guess in Wordle or Dodecordle sets the table for the rest of the game. A strong opener uses common letters in a valid word so that green and yellow feedback tell you a lot. This guide explains why certain opening words work well and how to pick one that helps all 12 words in Dodecordle. You can try your opener in the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game and read our <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> and <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> pages for more context.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">What Makes a Good First Word?</h2>
            <p>
              A good opening word is made of letters that appear often in five-letter English words. Vowels (A, E, I, O, U) and common consonants (R, S, T, N, L, C) show up in many solutions. One green or yellow from such a word narrows the possibilities a lot; one gray tells you that letter is missing from the answer, which is also useful when it is a common letter.
            </p>
            <p>
              You also want to avoid repeating the same letter (one letter per position) and to spread your letters across the word so you test position 1, 2, 3, 4, and 5. Words like CRANE, SLATE, and ROATE do this well: they pack in vowels and frequent consonants and cover all five positions. In Dodecordle that single guess gives you feedback for 12 words at once, so the payoff for a strong opener is even higher than in Wordle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Popular Openers and Why They Work</h2>
            <p>
              SLATE, CRANE, TRACE, and STARE are often recommended because they use common letters and no repeated letters. ROATE and SOARE are less common as English words but are valid in most Wordle-style lists and score very well on letter frequency. ADIEU uses four vowels, which can quickly reveal which vowels are in the word, but it uses fewer common consonants and leaves more letters untested.
            </p>
            <p>
              No single opener is “best” for every puzzle. What matters is that your first word is information-dense. If you prefer a word you like or remember easily, that is fine as long as it uses a mix of common letters and covers all five positions. For more on how letter frequency and word patterns work, see our guide on <Link href="/guides/word-patterns-and-letter-frequency" className="text-blue-400 hover:text-blue-300 underline">word patterns and letter frequency</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Second Guess Strategy</h2>
            <p>
              Your second guess should use the feedback from the first. If you got greens, keep those letters in place and fill the rest with new letters you have not tried. If you got yellows, put those letters in different positions. Use the keyboard display: gray letters are out for that word (or all words in Dodecordle), so do not reuse them in that column. A strong second word often reuses no grays and tests as many untried letters as possible in the remaining slots.
            </p>
            <p>
              In Dodecordle the same logic applies across 12 columns. Your second guess will produce 12 sets of feedback. Some words will have more greens and yellows, others more grays. Over time you will see which words are narrowing quickly and which need more information; that shapes your third and fourth guesses. For full strategy, read our <Link href="/guides/dodecordle-strategy" className="text-blue-400 hover:text-blue-300 underline">Dodecordle strategy</Link> guide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Should I use the same opener every day?</h3>
                <p>Many players do. It makes it easier to compare results and build intuition. Others rotate a few openers. Both are fine as long as the word is strong.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Are “word list” openers like ROATE allowed?</h3>
                <p>If the game accepts the word as valid, it is allowed. Dodecordle uses a standard five-letter word list; ROATE and similar words are valid guesses.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Does the best opener change for Dodecordle vs. Wordle?</h3>
                <p>The same principles apply: common letters, no repeats, all positions. Because one guess helps 12 words in Dodecordle, a strong opener is even more valuable.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I play?</h3>
                <p>Play the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game on the site. Our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> explains how we handle data.</p>
              </div>
            </div>
          </section>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
