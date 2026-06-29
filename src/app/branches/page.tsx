import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { BranchMapLoader } from '@/components/branches/BranchMapLoader';
import { REGIONS, BRANCH_COUNT } from '@/content/branches';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Branches — Hola Bakery Locations Across Luzon | Cafe Hola',
  description: `Find a Cafe Hola bakery near you — ${BRANCH_COUNT} branches across Luzon. Angeles City Pampanga, Metro Manila, Bulacan, Rizal, Batangas, Bataan, Tarlac, Nueva Ecija, and Olongapo.`,
  path: '/branches/',
});

export default function BranchesPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Branches', href: '/branches/' },
        ])}
      />

      {/* Header */}
      <div
        className="py-10 border-b"
        style={{
          backgroundColor: 'var(--color-surface-base)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Branches', href: '/branches/' },
            ]}
          />
          <h1
            className="mt-3 font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Find a Hola near you
          </h1>
          <p
            className="mt-3"
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {BRANCH_COUNT} branches across Luzon — from Pampanga to Metro Manila,
            Bulacan, Rizal, Batangas, and beyond.
          </p>
        </div>
      </div>

      {/* Interactive map */}
      <div
        className="py-8 border-b"
        style={{
          backgroundColor: 'var(--color-surface-base)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <BranchMapLoader regions={REGIONS} />
          <p
            className="mt-2 text-xs"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Click any pin to see branch details and message the branch directly.
          </p>
        </div>
      </div>

      {/* Branches by region */}
      <div
        className="py-12"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-12">
            {REGIONS.map((region) => (
              <section key={region.id} aria-labelledby={`region-${region.id}`}>
                {/* Region heading */}
                <div
                  className="flex items-center gap-3 mb-6 pb-3"
                  style={{ borderBottom: '2px solid var(--color-brand)' }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-brown)',
                    }}
                  >
                    📍
                  </span>
                  <h2
                    id={`region-${region.id}`}
                    className="font-bold"
                    style={{
                      fontSize: 'var(--text-xl)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {region.name}
                  </h2>
                  <span
                    className="ml-auto text-xs font-semibold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {region.branches.length} {region.branches.length === 1 ? 'branch' : 'branches'}
                  </span>
                </div>

                {/* Branch list */}
                <ul className="space-y-0" role="list">
                  {region.branches.map((branch, i) => (
                    <li
                      key={branch.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                      style={{
                        borderBottom:
                          i < region.branches.length - 1
                            ? '1px solid var(--color-border-subtle)'
                            : 'none',
                      }}
                    >
                      <div className="space-y-1 flex-1">
                        <p
                          className="font-semibold"
                          style={{
                            fontSize: 'var(--text-md)',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {branch.name}
                        </p>
                        {branch.address && (
                          <p
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {branch.address}
                          </p>
                        )}
                        {branch.hours && (
                          <p
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-text-secondary)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {branch.hours}
                          </p>
                        )}
                        {branch.phone && (
                          <p style={{ fontSize: 'var(--text-sm)' }}>
                            <a
                              href={`tel:${branch.phone.replace(/\s/g, '')}`}
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {branch.phone}
                            </a>
                          </p>
                        )}
                      </div>

                      <a
                        href={branch.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold flex-shrink-0 self-start"
                        style={{
                          backgroundColor: 'var(--color-brand)',
                          color: 'var(--color-text-on-brand)',
                          borderRadius: 'var(--radius-sm)',
                          minHeight: '36px',
                        }}
                        aria-label={`Message ${branch.name} on Facebook`}
                      >
                        Message branch
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
