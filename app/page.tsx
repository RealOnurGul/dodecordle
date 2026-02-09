import StartScreen from '@/components/StartScreen';
import { WebSiteJsonLd } from '@/components/JsonLd';
import { getSiteUrl } from '@/lib/siteUrl';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Dodecordle - Solve 12 Wordles at Once',
  description: 'Free daily word puzzle: solve 12 Wordles at once. Play the daily game or unlimited practice. No account required.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <WebSiteJsonLd baseUrl={getSiteUrl()} />
      <StartScreen />
    </>
  );
}
