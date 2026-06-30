import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { BRAND, SITE_URL } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Cafe Hola collects, uses, and protects information when you visit holabakery.skaldris.com or send an order or franchise inquiry.',
  path: '/privacy/',
});

const LAST_UPDATED = 'June 30, 2026';

const COLLECT = [
  {
    title: 'What you type into a form',
    body:
      "When you send an order inquiry or franchise inquiry, we collect what you fill in: your name, mobile number, the products or branch you're interested in, your delivery address (if you give one), your preferred date, and any message you write. The franchise form also asks for an email and target location.",
  },
  {
    title: 'What your browser shares automatically',
    body:
      'Like most websites, ours receives basic technical information from your browser when you visit — the page you requested, your general device and browser type, and an approximate, non-precise location derived from your IP address. We do not see your exact location or IP address ourselves.',
  },
  {
    title: 'What we deliberately do not collect',
    body:
      'No accounts, no passwords, no payment details, no cart, no cookies that track you across other websites. There is no advertising network on this site, and we never sell or rent your information to anyone.',
  },
];

const USE = [
  {
    title: 'To respond to your inquiry',
    body:
      "The details you submit go straight to the Hola team through our form handler, so we can reply about your order or franchise interest. That's the only reason we ask for them.",
  },
  {
    title: 'To understand how the site performs',
    body:
      'We use privacy-respecting, aggregated site analytics to see which pages are visited and whether the site loads quickly — never to identify you individually, and never shared with advertisers.',
  },
];

const SHARE = [
  {
    title: 'Formspree',
    body:
      "Our order and franchise forms are processed by Formspree, a third-party form service, so your submission can reach our inbox. Formspree's own privacy policy governs how they handle data in transit.",
    href: 'https://formspree.io/legal/privacy-policy/',
  },
  {
    title: 'Vercel',
    body:
      'The site is hosted on Vercel, and we use Vercel Analytics to measure traffic in aggregate. Vercel processes standard request data as part of serving the site to you.',
    href: 'https://vercel.com/legal/privacy-policy',
  },
  {
    title: 'Facebook & Instagram',
    body:
      "If you message us on Facebook or Instagram to place an order, that conversation is governed by Meta's privacy policy, not this one — we only see what you send us directly.",
    href: 'https://www.facebook.com/privacy/policy/',
  },
];

const RIGHTS = [
  'Ask what information we hold about you',
  'Ask us to correct it',
  'Ask us to delete it',
  'Withdraw consent for future contact',
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Privacy Policy', href: '/privacy/' },
        ])}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-dark)' }}
        aria-label="Privacy policy"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 15% 20%, rgba(242,183,5,0.16), transparent 55%), radial-gradient(circle at 85% 75%, rgba(94,58,135,0.14), transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-14 lg:pb-28">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Privacy Policy', href: '/privacy/' },
            ]}
          />

          <p
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 w-fit"
            style={{
              color: 'var(--color-text-on-brand)',
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Privacy
          </p>

          <h1
            className="font-bold mt-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              color: 'var(--color-text-inverse)',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              textWrap: 'balance',
            }}
          >
            Your privacy,{' '}
            <span
              style={{
                fontFamily: 'var(--font-pacifico), cursive',
                color: 'var(--color-brand)',
                fontWeight: 400,
              }}
            >
              handled simply.
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.7,
            }}
          >
            We're a neighborhood bakery, not a data company. This page tells
            you, in plain language, exactly what we collect when you visit or
            message us — and what we deliberately never do.
          </p>

          <p
            className="mt-8 text-xs"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}
          >
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ── In plain language ───────────────────────────────── */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: 'var(--color-surface-muted)' }}
        aria-label="Summary"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                label: 'No cart, no accounts',
                body: 'We never ask you to sign up or store payment details — orders are placed by message.',
              },
              {
                label: 'No selling, ever',
                body: 'Nothing you share with us is sold, rented, or handed to advertisers. Full stop.',
              },
              {
                label: 'You can ask us to delete it',
                body: 'Message us anytime and we will remove your inquiry details from our records.',
              },
            ].map((item) => (
              <div key={item.label}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 32,
                    height: 3,
                    backgroundColor: 'var(--color-brand)',
                    borderRadius: 'var(--radius-pill)',
                    marginBottom: 'var(--spacing-4)',
                  }}
                />
                <h2
                  className="font-bold mb-2"
                  style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-primary)' }}
                >
                  {item.label}
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* What we collect */}
          <div style={{ marginBottom: 'var(--spacing-16)' }}>
            <span
              className="block font-bold mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-brand-strong)' }}
            >
              01
            </span>
            <h2
              className="font-bold mb-8"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              What we collect
            </h2>
            <div className="space-y-8">
              {COLLECT.map((item) => (
                <div key={item.title}>
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How we use it */}
          <div style={{ marginBottom: 'var(--spacing-16)' }}>
            <span
              className="block font-bold mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-brand-strong)' }}
            >
              02
            </span>
            <h2
              className="font-bold mb-8"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              How we use it
            </h2>
            <div className="space-y-8">
              {USE.map((item) => (
                <div key={item.title}>
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Who we share with */}
          <div style={{ marginBottom: 'var(--spacing-16)' }}>
            <span
              className="block font-bold mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-brand-strong)' }}
            >
              03
            </span>
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Who we share it with
            </h2>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}
            >
              We work with a small number of trusted services to run this
              site and respond to you. We don't share data with anyone
              beyond what each of these needs to do its job.
            </p>
            <div className="space-y-6">
              {SHARE.map((item) => (
                <div
                  key={item.title}
                  className="p-6"
                  style={{
                    border: '1.5px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-muted)',
                  }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mb-3"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}
                  >
                    {item.body}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium"
                    style={{
                      color: 'var(--color-text-primary)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Read their privacy policy ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Your rights */}
          <div style={{ marginBottom: 'var(--spacing-16)' }}>
            <span
              className="block font-bold mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-brand-strong)' }}
            >
              04
            </span>
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Your rights
            </h2>
            <p
              className="mb-6"
              style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}
            >
              Whatever information you've shared with us, you're in control
              of it. At any time, you can:
            </p>
            <ul className="space-y-3" role="list">
              {RIGHTS.map((right) => (
                <li key={right} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    <circle cx="10" cy="10" r="9" stroke="var(--color-brand-strong)" strokeWidth="1.5" />
                    <path
                      d="M6 10.5l2.5 2.5L14 7.5"
                      stroke="var(--color-brand-strong)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-primary)' }}>
                    {right}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="mt-6"
              style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}
            >
              Just message us on Facebook or Instagram and ask — we'll handle
              it directly, no forms or fees.
            </p>
          </div>

          {/* Children */}
          <div style={{ marginBottom: 'var(--spacing-16)' }}>
            <span
              className="block font-bold mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-brand-strong)' }}
            >
              05
            </span>
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Children's privacy
            </h2>
            <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
              This site is intended for adults placing food orders or
              franchise inquiries. We don't knowingly collect information
              from children.
            </p>
          </div>

          {/* Changes */}
          <div>
            <span
              className="block font-bold mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-brand-strong)' }}
            >
              06
            </span>
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Changes to this policy
            </h2>
            <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
              If how we handle information ever changes, we'll update this
              page and the date at the top. We won't make material changes
              quietly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact strip ────────────────────────────────────── */}
      <section
        className="py-20 lg:py-24"
        style={{ backgroundColor: 'var(--color-surface-dark)' }}
        aria-label="Contact us about privacy"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--color-text-inverse)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Questions about your data?
          </h2>
          <p
            className="mt-4 mb-10 max-w-lg mx-auto"
            style={{ fontSize: 'var(--text-md)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}
          >
            Message {BRAND.shortName} directly — a real person reads every
            message and will get back to you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" className="hola-btn-primary">
              Message on Facebook
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold border-2 whitespace-nowrap"
              style={{
                borderColor: 'rgba(255,255,255,0.6)',
                color: 'var(--color-text-inverse)',
                borderRadius: 'var(--radius-sm)',
                minHeight: '48px',
                fontSize: 'var(--text-md)',
              }}
            >
              Message on Instagram
            </a>
          </div>
          <p
            className="mt-10 text-xs"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {BRAND.name} · {SITE_URL.replace('https://', '')} ·{' '}
            <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}>
              Back to home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
