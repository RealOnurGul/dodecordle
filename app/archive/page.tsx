import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { BreadcrumbListJsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata = buildMetadata({
  title: 'Archive | Dodecordle',
  description: 'Past daily puzzles and how to play today’s Dodecordle.',
  path: '/archive',
});

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <BreadcrumbListJsonLd baseUrl={getSiteUrl()} items={[{ name: 'Home', url: '/' }, { name: 'Archive' }]} />
      <div className="max-w-4xl mx-auto">
        <PageHeader />

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Archive</h1>
        <p className="text-gray-400 mb-6">
          Each day has one shared daily puzzle. Past puzzles are not replayable; each day’s puzzle is available only on that day. You can always play unlimited games in <Link href="/game?practice=true" className="text-blue-400 hover:text-blue-300 underline">Practice</Link> mode.
        </p>

        <PageFooter />
      </div>
    </div>
  );
}
