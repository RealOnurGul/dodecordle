import { Metadata } from 'next';
import { getSiteUrl } from './siteUrl';

type MetaInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function buildMetadata({ title, description, path, noIndex = false }: MetaInput): Metadata {
  const base = getSiteUrl();
  const url = `${base}${normalizePath(path)}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Dodecordle',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };

  if (noIndex) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

export function buildGuideMetadata(path: string, title: string, description: string): Metadata {
  const base = getSiteUrl();
  const url = `${base}${normalizePath(path)}`;
  return {
    title: `${title} | Dodecordle Guides`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Dodecordle Guides`,
      description,
      url,
      siteName: 'Dodecordle',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Dodecordle Guides`,
      description,
    },
  };
}
