import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/content/site';

export function Hero() {
  return (
    <section
      aria-label="Hero — Cafe Hola"
      className="relative overflow-hidden noise-overlay"
      style={{
        backgroundColor: 'var(--color-surface-muted)',
        minHeight: 'clamp(480px, 70vh, 720px)',
      }}
    >
      {/* Warm cream-to-yellow gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(242,183,5,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-24">
          {/* Copy */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Eyebrow */}
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1"
              style={{
                color: 'var(--color-brown)',
                backgroundColor: 'rgba(107,63,18,0.08)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Original brand from Pampanga · 20 branches across Luzon
            </p>

            {/* Headline */}
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              The original{' '}
              <span
                style={{
                  fontFamily: 'var(--font-pacifico), cursive',
                  color: 'var(--color-brand)',
                  fontWeight: 400,
                }}
              >
                Hola
              </span>{' '}
              Kapampangan Bakery
            </h1>

            <p
              className="max-w-md"
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
              }}
            >
              Freshly baked Creamcheese Ensaymadness, cheese bread bites, and
              pillow-soft bread — born in Pampanga, loved across the Philippines.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hola-btn-primary"
              >
                Order on Facebook
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link
                href="/menu/"
                className="hola-btn-outline"
              >
                See the menu
              </Link>
            </div>

            {/* Tagline sign-off — once per view */}
            <p
              className="pt-4"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-brown)',
                fontSize: 'var(--text-xl)',
              }}
            >
              {BRAND.tagline}
            </p>
          </div>

          {/* Hero food photography */}
          <div
            className="relative order-1 lg:order-2"
            style={{ aspectRatio: '4/3' }}
          >
            <Image
              src="/assets/photos/546456029_1372782538185264_458962016792196231_n.jpg"
              alt="Hola Ensaymadness in a branded yellow box — pillowy ensaymada rolls piled with grated cheese and a cream drizzle"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
