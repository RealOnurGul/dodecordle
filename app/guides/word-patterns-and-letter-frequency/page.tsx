import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { getGuide } from '@/lib/guidesMeta';

export async function generateMetadata() {
  const guide = getGuide('word-patterns-and-letter-frequency');
  return {
    title: guide ? `${guide.title} | Dodecordle Guides` : 'Guides | Dodecordle',
    description: guide?.description,
  };
}

export default function WordPatternsAndLetterFrequencyPage() {
  const guide = getGuide('word-patterns-and-letter-frequency')!;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{guide.title}</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Wordle and Dodecordle both use five-letter English words. Some letters appear in those words much more often than others, and certain letter combinations and patterns are common. Using that knowledge can guide your guesses and reduce wasted turns. This guide covers the basics of letter frequency and word patterns so you can apply them in the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> and <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> games. For more strategy, see our <Link href="/guides/best-opening-words" className="text-blue-400 hover:text-blue-300 underline">best opening words</Link> and <Link href="/guides/dodecordle-strategy" className="text-blue-400 hover:text-blue-300 underline">Dodecordle strategy</Link> guides; our <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> and <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> pages have the rest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Letter Frequency in Five-Letter Words</h2>
            <p>
              In standard word lists of five-letter English words, the most common letters are E, A, R, S, T, O, L, N, I, and C. The least common include Q, Z, J, X, and sometimes K and V. That does not mean every answer uses the top letters, but on average, guesses that use E, A, R, S, T will hit something in the answer more often than guesses full of Q, Z, and J. So your early guesses should favor common letters when you have no other information.
            </p>
            <p>
              Position matters too. E appears at the end of five-letter words very often (e.g. -ABLE, -ANCE, -TURE). S is common at the start and end. Some letters cluster in the middle. You do not need to memorize tables; after playing for a while you develop a feel for which letters “usually” go where. The keyboard in Wordle and Dodecordle helps by showing which letters you have already tried and what result they gave.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Common Word Patterns</h2>
            <p>
              Once you have one or two greens or yellows, you can think in patterns. Words ending in -E, -T, -S, or -Y are plentiful. Common suffixes include -ING (in longer words; for five letters, -TION is not possible but -TIVE, -TION-like shapes in context can help). Double letters (e.g. LL, SS, EE) appear in many solutions. Consonant-vowel patterns like CVCVC (consonant-vowel-consonant-vowel-consonant) are very common; so are words with two vowels in the middle.
            </p>
            <p>
              When you have a green in position 1 and a yellow that cannot go in position 2, try placing that yellow in 3, 4, or 5 and fill the rest with high-frequency letters you have not tried. You are effectively testing “does the word fit this pattern?” and using letter frequency to choose the remaining letters. In Dodecordle you do this across 12 words; the same pattern logic applies per word, but you have to track 12 patterns at once.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Using Frequency Without Overfitting</h2>
            <p>
              Letter frequency is a guide, not a rule. Some answers use rarer letters. If the feedback strongly suggests a word with a Q or a Z, use it. Do not avoid a likely word just because it is “uncommon.” Frequency is most useful for the first two guesses when you have little or no information; after that, feedback should dominate your choices.
            </p>
            <p>
              In Dodecordle, one guess helps 12 words. A word that is “average” on frequency but tests many untried letters in different positions can still be a good guess if it maximizes information across the board. Balance frequency with “how much will I learn from this?” For more on avoiding wasted guesses, read <Link href="/guides/mistakes-to-avoid" className="text-blue-400 hover:text-blue-300 underline">mistakes to avoid</Link>. Our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> explains how we handle data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What is the best first letter to guess?</h3>
                <p>There is no single “best” letter; it depends on the word. For opening words, using several of E, A, R, S, T, O, L, N in one guess is a strong approach.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Do word patterns work the same in Dodecordle as in Wordle?</h3>
                <p>Yes. Each of the 12 words is a standard five-letter word. Letter frequency and patterns apply per word; the difference is you are applying them to 12 words in one game.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I play?</h3>
                <p>Play the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game here. See <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> and <Link href="/archive" className="text-blue-400 hover:text-blue-300 underline">Archive</Link> for more.</p>
              </div>
            </div>
          </section>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
