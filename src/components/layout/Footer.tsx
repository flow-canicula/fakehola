import Link from 'next/link';
import Image from 'next/image';
import { BRAND, NAV_LINKS } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-text-inverse)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo/349594746_1694568097629810_5399586794046856493_n.jpg"
                alt=""
                width={40}
                height={40}
                className="rounded-full"
                aria-hidden="true"
              />
              <span className="text-xl font-bold">{BRAND.shortName}</span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              The original Kapampangan bakery. Freshly baked ensaymada,
              kakanin, and soft breads — genuine and authentic, always.
            </p>
            <p
              className="text-sm font-medium italic"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brand)', fontSize: '1rem' }}
            >
              {BRAND.tagline}
            </p>
          </div>

          {/* Nav column */}
          <nav aria-label="Footer navigation">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Pages
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm transition-colors"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    transitionDuration: 'var(--duration-instant)',
                  }}
                >
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      transitionDuration: 'var(--duration-instant)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Order column */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Order Now
            </p>
            <div className="space-y-3">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  transitionDuration: 'var(--duration-instant)',
                }}
              >
                Facebook — {BRAND.facebookHandle}
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  transitionDuration: 'var(--duration-instant)',
                }}
              >
                Instagram — @{BRAND.instagramHandle}
              </a>
              <p
                className="text-xs mt-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {BRAND.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <p>
            &copy; {year} {BRAND.name}. All rights reserved.
          </p>
          <p>{BRAND.origin}</p>
        </div>
      </div>
    </footer>
  );
}
