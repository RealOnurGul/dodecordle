type BreadcrumbItem = { name: string; url?: string };

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd({ baseUrl }: { baseUrl: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dodecordle',
    url: baseUrl,
    description: 'Solve 12 Wordles at once. A free daily word puzzle and practice mode.',
    potentialAction: {
      '@type': 'PlayAction',
      target: [
        { '@type': 'EntryPoint', url: `${baseUrl}/game` },
        { '@type': 'EntryPoint', url: `${baseUrl}/game?practice=true` },
      ],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbListJsonLd({ baseUrl, items }: { baseUrl: string; items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url && { item: `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}` }` }),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
