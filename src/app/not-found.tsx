import Link from 'next/link';
import { BRAND } from '@/content/site';

export default function NotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-32 px-4"
      style={{ backgroundColor: 'var(--color-surface-muted)', minHeight: '60vh' }}
    >
      {/* Yellow circle */}
      <div
        className="flex items-center justify-center w-20 h-20 mb-8"
        style={{
          backgroundColor: 'var(--color-brand)',
          borderRadius: 'var(--radius-pill)',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: 'var(--color-text-on-brand)',
            fontWeight: 400,
          }}
        >
          ?
        </span>
      </div>

      <h1
        className="font-bold mb-4"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        Page not found
      </h1>

      <p
        className="max-w-sm mb-8"
        style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}
      >
        Looks like this page went out of stock. Let's get you back to the good stuff.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3.5 font-semibold"
          style={{
            backgroundColor: 'var(--color-brand)',
            color: 'var(--color-text-on-brand)',
            borderRadius: 'var(--radius-sm)',
            minHeight: '48px',
            fontSize: 'var(--text-md)',
          }}
        >
          Go home
        </Link>
        <Link
          href="/menu/"
          className="inline-flex items-center justify-center px-7 py-3.5 font-semibold border-2"
          style={{
            borderColor: 'var(--color-border-strong)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-sm)',
            minHeight: '48px',
            fontSize: 'var(--text-md)',
          }}
        >
          View the menu
        </Link>
      </div>

      <p
        className="mt-10"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-brown)',
        }}
      >
        {BRAND.tagline}
      </p>
    </section>
  );
}
