import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { getGuide } from '@/lib/guidesMeta';

export async function generateMetadata() {
  const guide = getGuide('how-to-improve-wordle-skills');
  return {
    title: guide ? `${guide.title} | Dodecordle Guides` : 'Guides | Dodecordle',
    description: guide?.description,
  };
}

export default function HowToImproveWordleSkillsPage() {
  const guide = getGuide('how-to-improve-wordle-skills')!;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{guide.title}</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Getting better at Wordle-style games is mostly about pattern recognition, efficient guessing, and avoiding wasted turns. This guide gives practical ways to improve whether you play classic Wordle, Dodecordle, or other daily word puzzles. Use the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> and <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> games to apply these ideas, and check our <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> and <Link href="/guides/mistakes-to-avoid" className="text-blue-400 hover:text-blue-300 underline">mistakes to avoid</Link> for more structure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pay Attention to Feedback</h2>
            <p>
              Every guess returns green, yellow, or gray. Greens and yellows tell you which letters are in the word and where (or where not). Grays tell you which letters are out. The biggest mistake is guessing again without using that information: repeating a gray letter, or putting a yellow letter back in the same spot. Before you submit, double-check that your next word is consistent with all previous feedback. One wasted guess per game adds up; avoiding that alone will improve your solve rate.
            </p>
            <p>
              In games like Dodecordle where one guess applies to many words, the keyboard summary (which letters are green, yellow, or gray across all grids) is essential. Glance at it before each guess so you do not reuse letters that are already ruled out in the words you are still solving.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Build a Repertoire of Strong Openers and Follow-ups</h2>
            <p>
              You do not need to memorize hundreds of words. Having one or two openers you know well (e.g. SLATE, CRANE) and a mental list of good second words that use different letters will take you far. After your first guess, think “which letters have I not tried?” and “where can I put the yellows?” Your second word should test new letters and move yellows to new positions. We have a full guide on <Link href="/guides/best-opening-words" className="text-blue-400 hover:text-blue-300 underline">best opening words</Link> if you want to go deeper.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Use Letter Frequency and Word Patterns</h2>
            <p>
              In English, some letters appear in five-letter words more often than others. E, A, R, S, T, and O are very common; Q, Z, J are rarer. Early guesses that use common letters tend to yield more greens and yellows. Once you have a few letters, think about common patterns: -IGHT, -OUND, S---E, etc. Our guide on <Link href="/guides/word-patterns-and-letter-frequency" className="text-blue-400 hover:text-blue-300 underline">word patterns and letter frequency</Link> goes into this in detail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Practice Deliberately</h2>
            <p>
              Playing one Wordle per day is fun but slow for improvement. Use <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> mode to play multiple games. After each game, briefly ask: “Where did I waste a guess?” or “Which word took too many turns?” Reviewing one or two games per session helps more than playing on autopilot. If you want a harder challenge, try <Link href="/guides/hard-wordle-variants" className="text-blue-400 hover:text-blue-300 underline">hard Wordle variants</Link> like Dodecordle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">How long does it take to get better?</h3>
                <p>Most people see improvement within a few weeks if they play regularly and avoid obvious mistakes (reusing grays, ignoring yellows). Consistency matters more than volume.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Should I use a strategy every time or guess freely?</h3>
                <p>Using a consistent opener and then building from feedback is a reliable way to improve. Once that feels automatic, you can experiment with different openers or riskier guesses.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I play Dodecordle?</h3>
                <p>Play the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game here. See our <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> and <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> for more info.</p>
              </div>
            </div>
          </section>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
