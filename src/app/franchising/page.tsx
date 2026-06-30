import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FranchiseInquiryForm } from '@/components/forms/FranchiseInquiryForm';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { BRAND } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Franchising | Cafe Hola Kapampangan Bakery',
  description:
    'Bring the original Kapampangan bakery to your city. Explore franchising with Cafe Hola — 20 branches strong across Luzon and growing.',
  path: '/franchising/',
});

const PILLARS = [
  {
    number: '01',
    title: 'A proven brand',
    description:
      'Genuine, authentic Kapampangan recipes and a following built over years — not a concept, a brand customers already love.',
  },
  {
    number: '02',
    title: 'A growing footprint',
    description:
      `${BRAND.location}, and counting. Hola is already a name people recognize before you open your doors.`,
  },
  {
    number: '03',
    title: 'A partner, not a landlord',
    description:
      'We work with our franchise partners directly — on sourcing, training, and the standards that keep every branch unmistakably Hola.',
  },
];

const PROCESS = [
  {
    number: '01',
    title: 'Send your inquiry',
    description: 'Tell us about yourself, your target location, and your investment range.',
  },
  {
    number: '02',
    title: 'We talk it through',
    description: 'A member of the Hola team reaches out to walk you through what franchising involves.',
  },
  {
    number: '03',
    title: 'Site & terms review',
    description: 'We evaluate your proposed location together and review the franchise terms in detail.',
  },
  {
    number: '04',
    title: 'Open as Hola',
    description: 'Training, setup, and launch support to get your branch baking — Basta Hola, Manyaman.',
  },
];

export default function FranchisingPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Franchising', href: '/franchising/' },
        ])}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        aria-label="Franchising — Cafe Hola"
        style={{ minHeight: 'clamp(560px, 90vh, 880px)' }}
      >
        <Image
          src="/assets/franchising/franchising-1.jpg"
          alt="Ribbon-cutting at the opening of a new Hola branch, with the Hola team and the bright yellow Hola storefront sign behind them"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.35) 45%, rgba(26,26,26,0.85) 100%)',
          }}
        />

        <div className="relative h-full flex flex-col justify-end mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-6 w-fit"
            style={{
              color: 'var(--color-text-on-brand)',
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Franchising
          </p>

          <h1
            className="font-bold leading-[0.95]"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 6rem)',
              color: 'var(--color-text-inverse)',
              letterSpacing: '-0.03em',
              textWrap: 'balance',
              maxWidth: '18ch',
            }}
          >
            Bring{' '}
            <span
              style={{
                fontFamily: 'var(--font-pacifico), cursive',
                color: 'var(--color-brand)',
                fontWeight: 400,
              }}
            >
              Hola
            </span>{' '}
            to your city.
          </h1>

          <p
            className="mt-6 max-w-xl"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.65,
            }}
          >
            The original Kapampangan bakery, {BRAND.location.toLowerCase()} and growing.
            Build a Hola branch in your community — backed by a brand people already
            line up for.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-8">
            <a href="#inquire" className="hola-btn-primary">
              Start your inquiry
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href={BRAND.facebook}
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
              Message us first
            </a>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb bar ───────────────────────────────────── */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-base)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Franchising', href: '/franchising/' },
            ]}
          />
        </div>
      </div>

      {/* ── Why franchise ────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
        aria-label="Why franchise with Hola"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Why partners choose Hola.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {PILLARS.map((pillar) => (
              <div key={pillar.number}>
                <span
                  className="block font-bold mb-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-4xl)',
                    color: 'var(--color-brand)',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {pillar.number}
                </span>
                <h3
                  className="font-bold mb-3"
                  style={{
                    fontSize: 'var(--text-xl)',
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-md)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branch gallery ───────────────────────────────────── */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2"
        aria-label="Hola branches in action"
      >
        <div className="relative" style={{ aspectRatio: '4/3' }}>
          <Image
            src="/assets/franchising/franchising-2.jpg"
            alt="Inside a Hola branch — the sunrise-yellow Hola wall mark above the pastry display case"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative" style={{ aspectRatio: '4/3' }}>
          <Image
            src="/assets/franchising/franchising-3.jpg"
            alt="A Hola kiosk opening inside a shopping mall, with boxed breads on display and HOLA balloon letters"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Bold statement strip ─────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: 'var(--color-surface-dark)' }}
        aria-label="Brand statement"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.25rem)',
              color: 'var(--color-text-inverse)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              textWrap: 'balance',
            }}
          >
            Genuine and authentic Kapampangan baking, in every branch we open —
            no shortcuts, no exceptions.
          </p>
          <p
            className="mt-8"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-brand)',
              fontSize: 'var(--text-2xl)',
            }}
          >
            {BRAND.tagline}
          </p>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'var(--color-surface-muted)' }}
        aria-label="How franchising works"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              How it works.
            </h2>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10" role="list">
            {PROCESS.map((step) => (
              <li key={step.number} className="flex flex-col gap-3">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-4xl)',
                    color: 'var(--color-brown)',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3
                  className="font-semibold"
                  style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <p
            className="mt-12 max-w-2xl"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}
          >
            Investment range, fees, and specific requirements are confirmed
            directly with our team based on your target location — send an
            inquiry below and we&apos;ll walk you through the current terms.
          </p>
        </div>
      </section>

      {/* ── Inquiry form ─────────────────────────────────────── */}
      <section
        id="inquire"
        className="py-20 lg:py-28 scroll-mt-20"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
        aria-label="Franchise inquiry"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden="true"
            style={{
              width: '40px',
              height: '3px',
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-pill)',
              marginBottom: 'var(--spacing-4)',
            }}
          />
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Let&apos;s talk franchising.
          </h2>
          <p
            className="mt-4 mb-12 max-w-xl"
            style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}
          >
            Fill out the form and our team will reach out with the current
            franchise terms for your area. Prefer to talk first? Message us
            directly.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hola-btn-primary"
            >
              <FacebookIcon size={18} />
              Message on Facebook
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hola-btn-outline"
            >
              <InstagramIcon size={18} />
              Message on Instagram
            </a>
          </div>

          <FranchiseInquiryForm />

          <div
            style={{
              marginTop: 'var(--spacing-8)',
              paddingTop: 'var(--spacing-6)',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                Curious what a Hola branch looks like first?
              </strong>{' '}
              <Link
                href="/branches/"
                style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                See all {BRAND.location}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
