import type { Promo } from '@/content/promos';

interface PromoStripProps {
  promos: Promo[];
}

export function PromoStrip({ promos }: PromoStripProps) {
  if (promos.length === 0) return null;

  const promo = promos[0]!;

  return (
    <section
      aria-label="Current promotion"
      className="py-16"
      style={{ backgroundColor: 'var(--color-surface-muted)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-md overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, var(--color-brand) 0%, #F5C842 100%)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          <div className="max-w-2xl">
            {/* Eyebrow — script face, once per view */}
            <p
              className="mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--color-brown)',
              }}
            >
              {promo.eyebrow}
            </p>

            <h2
              className="font-bold mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-on-brand)',
                letterSpacing: '-0.02em',
              }}
            >
              {promo.title}
            </h2>

            <p
              className="mb-8"
              style={{
                fontSize: 'var(--text-lg)',
                color: 'rgba(26,26,26,0.75)',
                lineHeight: 1.65,
                maxWidth: '36rem',
              }}
            >
              {promo.copy}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={promo.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-colors"
                style={{
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-text-inverse)',
                  borderRadius: 'var(--radius-sm)',
                  transitionDuration: 'var(--duration-instant)',
                  minHeight: '48px',
                  fontSize: 'var(--text-md)',
                }}
              >
                {promo.cta}
              </a>

              {/* Second promo CTA if available */}
              {promos[1] && (
                <a
                  href={promos[1].ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 font-semibold border-2 transition-colors"
                  style={{
                    borderColor: 'var(--color-ink)',
                    color: 'var(--color-text-on-brand)',
                    borderRadius: 'var(--radius-sm)',
                    transitionDuration: 'var(--duration-instant)',
                    minHeight: '48px',
                    fontSize: 'var(--text-md)',
                  }}
                >
                  {promos[1].cta}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
