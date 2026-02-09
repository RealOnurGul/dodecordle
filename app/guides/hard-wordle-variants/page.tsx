import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { BreadcrumbListJsonLd } from '@/components/JsonLd';
import { getGuide } from '@/lib/guidesMeta';
import { buildGuideMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/siteUrl';

export async function generateMetadata() {
  const guide = getGuide('hard-wordle-variants');
  if (!guide) return { title: 'Guides | Dodecordle' };
  return buildGuideMetadata('/guides/hard-wordle-variants', guide.title, guide.description);
}

export default function HardWordleVariantsPage() {
  const guide = getGuide('hard-wordle-variants')!;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <BreadcrumbListJsonLd baseUrl={getSiteUrl()} items={[{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: guide.title }]} />
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{guide.title}</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Wordle’s one-word-per-day format left many players wanting more. Hard Wordle variants multiply the challenge: multiple words per game, same guess applied to all, and the same color feedback. This guide looks at what makes these variants tough and how Dodecordle fits in. You can try the <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> or <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> game here and read our <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> and <Link href="/how-to-play" className="text-blue-400 hover:text-blue-300 underline">How to Play</Link> pages for the basics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Why Multiple Words Are Harder</h2>
            <p>
              In classic Wordle you have six guesses for one word. In Quordle you have nine guesses for four words; in Octordle, 13 for eight; in Dodecordle, 14 for 12 words. The guess limit does not scale linearly with the number of words. You have to make each guess count for several words at once. That means choosing words that give information across many grids, not just one. One weak or repetitive guess can leave you behind in several columns.
            </p>
            <p>
              You also have to track 12 sets of constraints. A letter might be green in one word, yellow in another, and gray in a third. Keeping that in your head (or using the grid and keyboard) is part of the challenge. Hard variants reward the same skills as Wordle—letter frequency, pattern recognition, logical deduction—but under tighter pressure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Quordle, Octordle, and Dodecordle</h2>
            <p>
              Quordle (4 words) and Octordle (8 words) use the same idea: one guess, multiple words, shared guess count. Dodecordle pushes it to 12 words and 14 guesses. The more words, the more important it is that your early guesses are information-dense. Wasting a turn in Wordle costs one guess; in Dodecordle it can leave multiple words underdetermined. Our <Link href="/guides/dodecordle-strategy" className="text-blue-400 hover:text-blue-300 underline">Dodecordle strategy</Link> guide goes into how to spread your guesses and when to focus on one word.
            </p>
            <p>
              These variants are not “Wordle with more words” in a trivial sense. They are daily word puzzles that reuse the same rules but demand better opening words, clearer tracking of feedback, and fewer mistakes. If you enjoy Wordle and want a steeper challenge, <Link href="/game" className="text-blue-400 hover:text-blue-300 underline">Daily</Link> and <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> Dodecordle are a good next step.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Other Ways Games Get Harder</h2>
            <p>
              Some variants use a smaller word list, or longer words, or a different language. Others add rules (e.g. no repeating a letter). Dodecordle keeps the standard five-letter Wordle rules and simply increases the number of words and the need for efficiency. That makes it easy to learn if you already know Wordle, and the difficulty comes from scope and guess management rather than new rules. For tips on improving in any of these games, see <Link href="/guides/how-to-improve-wordle-skills" className="text-blue-400 hover:text-blue-300 underline">how to improve your Wordle skills</Link> and <Link href="/guides/mistakes-to-avoid" className="text-blue-400 hover:text-blue-300 underline">mistakes to avoid</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Who Are Hard Variants For?</h2>
            <p>
              They are for players who find Wordle too quick or want more puzzle per day. They are also good for deliberate practice: more words per game means more pattern recognition per session. If you like the <Link href="/archive" className="text-blue-400 hover:text-blue-300 underline">Archive</Link> idea of daily challenges and want to push yourself, Dodecordle’s 12-word format is one of the hardest in the “same rules, more words” category. Our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> and <Link href="/about" className="text-blue-400 hover:text-blue-300 underline">About</Link> pages have more on how we run the site.
            </p>
          </section>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
