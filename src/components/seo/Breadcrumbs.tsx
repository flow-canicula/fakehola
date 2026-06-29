import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol
        className="flex flex-wrap items-center gap-1 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="transition-colors hover:underline"
                    style={{
                      color: 'var(--color-text-secondary)',
                      transitionDuration: 'var(--duration-instant)',
                    }}
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" style={{ color: 'var(--color-border-subtle)' }}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
