import Link from 'next/link';

type PageHeaderProps = {
  /** Optional breadcrumb items (e.g. Guides > Article title). Rendered after the back link. */
  breadcrumbs?: { label: string; href?: string }[];
};

export default function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
        >
          <span aria-hidden>←</span>
          <span>Dodecordle</span>
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500" aria-label="Site">
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/how-to-play" className="hover:text-white transition-colors">How to play</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </nav>
      </div>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mt-3 text-sm text-gray-500">
          {breadcrumbs.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-1.5">›</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}
