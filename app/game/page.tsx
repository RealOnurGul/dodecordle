import type { Metadata } from 'next';
import GamePageClient from '@/components/GamePageClient';
import { getSiteUrl } from '@/lib/siteUrl';

type Props = { searchParams: Promise<{ practice?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { practice } = await searchParams;
  const isPractice = practice === 'true';
  const base = getSiteUrl();
  const path = isPractice ? '/game?practice=true' : '/game';
  const url = `${base}${path}`;

  const title = isPractice
    ? 'Practice Mode | Dodecordle - 12 Word Wordle'
    : 'Daily Game | Dodecordle - Solve 12 Wordles at Once';
  const description = isPractice
    ? 'Play unlimited Dodecordle practice games. Solve 12 Wordles at once with 14 guesses. No account required.'
    : 'Play today\'s Dodecordle daily puzzle. Solve 12 Wordles at once. One shared puzzle per day for everyone.';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Dodecordle', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function GamePage() {
  return <GamePageClient />;
}
