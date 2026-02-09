import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { GUIDE_SLUGS, GUIDES } from '@/lib/guidesMeta';

export const metadata = {
  title: 'Guides | Dodecordle',
  description:
    'Strategy guides, tips, and advice for Dodecordle and Wordle-style games: opening words, letter frequency, and how to improve.',
};

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader breadcrumbs={[{ label: 'Guides' }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Guides</h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Strategy, opening words, and tips for Dodecordle and other Wordle-style puzzles. Use these guides to play smarter and finish more puzzles.
        </p>

        <ul className="space-y-4">
          {GUIDE_SLUGS.map((slug) => {
            const guide = GUIDES[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/guides/${slug}`}
                  className="block bg-gray-800/80 rounded-lg p-5 border border-gray-700/80 hover:border-gray-600 hover:bg-gray-800 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-white mb-1">{guide.title}</h2>
                  <p className="text-gray-400 text-sm">{guide.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <PageFooter />
      </div>
    </div>
  );
}
