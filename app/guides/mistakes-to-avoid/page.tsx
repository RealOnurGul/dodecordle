import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { getGuide } from '@/lib/guidesMeta';

export async function generateMetadata() {
  const guide = getGuide('mistakes-to-avoid');
  return {
    title: guide ? `${guide.title} | Dodecordle Guides` : 'Guides | Dodecordle',
    description: guide?.description,
  };
}

export default function MistakesToAvoidPage() {
  const guide = getGuide('mistakes-to-avoid')!;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{guide.title}</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              In Wordle and Dodecordle, a single wasted guess can be the difference between solving the puzzle and running out of turns. This guide lists common mistakes and how to fix them. Avoiding these will improve your solve rate in the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> and <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> games. For positive strategy, see our <Link href="/guides/dodecordle-strategy" className="text-blue-400 hover:text-blue-300 underline">Dodecordle strategy</Link> and <Link href="/guides/best-opening-words" className="text-blue-400 hover:text-blue-300 underline">best opening words</Link>; for rules, <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> and <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Reusing Gray Letters</h2>
            <p>
              Once a letter is gray, it is not in the answer (in that word, or in any of the 12 in Dodecordle). Using that letter again in a later guess wastes the guess. Always check the keyboard or your previous rows before submitting: if a letter is gray, do not type it again in a word you are still solving. It is easy to do when you are focused on one column; in Dodecordle, the shared keyboard helps because a letter gray in any word is gray overall, so you are reminded not to reuse it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Ignoring Yellow Feedback</h2>
            <p>
              Yellow means the letter is in the word but in a different position. Putting that letter in the same position again cannot be correct. Move it to another slot. Some players type the same word twice or a word that only shuffles one letter; that costs a turn. Before you submit, confirm that every yellow from earlier guesses is either in a new position (if still yellow) or in the correct position (if you are trying to solve).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Guessing Without a Plan</h2>
            <p>
              Random or “gut” guesses sometimes work, but they often repeat letters you already know are wrong or put yellows back where they cannot go. Even a quick mental check—“Did I use any grays? Did I move every yellow?”—saves turns. In Dodecordle, guessing without a plan is riskier because one guess affects 12 words; a thoughtless word might give you almost no new information across the board.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Weak Opening Words</h2>
            <p>
              Your first guess has no feedback to work from, so it should maximize information. Words full of rare letters (Q, Z, J) or repeated letters (e.g. EEEEE) tell you less than words that use five different common letters. You do not have to use the same opener every time, but it should be information-dense. See our guide on <Link href="/guides/best-opening-words" className="text-blue-400 hover:text-blue-300 underline">best opening words</Link> for concrete suggestions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Fixing the Habit</h2>
            <p>
              After each game, ask: “Did I reuse a gray?” or “Did I ignore a yellow?” One review per session is enough to build the habit of checking. In <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> you can play multiple games and focus on one thing (e.g. “this game I will not reuse any gray”). For more on getting better overall, read <Link href="/guides/how-to-improve-wordle-skills" className="text-blue-400 hover:text-blue-300 underline">how to improve your Wordle skills</Link>. Our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> and <Link href="/archive" className="text-blue-400 hover:text-blue-300 underline">Archive</Link> are linked in the nav above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What is the biggest mistake in Dodecordle?</h3>
                <p>Reusing a letter that is already gray (not in any of the 12 words) or putting a yellow letter in the same position again. Both waste a guess that could have narrowed many words.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Should I always use a “best” opening word?</h3>
                <p>You do not have to, but using an opener with common letters and no repeats gives you more information. Avoiding a weak opener is more important than picking the single “best” one.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">How do I stop guessing too fast?</h3>
                <p>Pause before each guess and run through: grays not reused, yellows in new positions, and (in Dodecordle) whether this word helps several grids. Even a few seconds helps.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Where can I play?</h3>
                <p>Play <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> here. More at <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> and <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link>.</p>
              </div>
            </div>
          </section>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
