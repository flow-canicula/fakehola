import Link from 'next/link';
import { BRAND } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Inquiry sent',
  path: '/franchising/thanks/',
  noIndex: true,
});

export default function FranchisingThanksPage() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-32 px-4"
      style={{ backgroundColor: 'var(--color-surface-muted)', minHeight: '60vh' }}
    >
      {/* Yellow circle mark */}
      <div
        className="flex items-center justify-center w-20 h-20 mb-8"
        style={{
          backgroundColor: 'var(--color-brand)',
          borderRadius: 'var(--radius-pill)',
        }}
        aria-hidden="true"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16L13 23L26 10"
            stroke="#1A1A1A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1
        className="font-bold mb-4"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        Got it! We&apos;ll get back to you shortly.
      </h1>

      <p
        className="max-w-md mb-2"
        style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}
      >
        Your franchise inquiry has been sent. Our team will reach out with the
        current terms for your area.
      </p>

      <p
        className="mb-10"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-brown)',
        }}
      >
        {BRAND.tagline}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/branches/"
          className="inline-flex items-center justify-center px-7 py-3.5 font-semibold"
          style={{
            backgroundColor: 'var(--color-brand)',
            color: 'var(--color-text-on-brand)',
            borderRadius: 'var(--radius-sm)',
            minHeight: '48px',
            fontSize: 'var(--text-md)',
          }}
        >
          See our branches
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3.5 font-semibold border-2"
          style={{
            borderColor: 'var(--color-border-strong)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-sm)',
            minHeight: '48px',
            fontSize: 'var(--text-md)',
          }}
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
