'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, BRAND } from '@/content/site';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Restore focus to hamburger when menu closes */
  useEffect(() => {
    if (!menuOpen) {
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-30 w-full transition-shadow"
        style={{
          backgroundColor: 'var(--color-surface-base)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transitionDuration: 'var(--duration-base)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / wordmark */}
            <Link
              href="/"
              aria-label={`${BRAND.name} home`}
              className="flex items-center gap-2 font-bold text-xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <Image
                src="/assets/logo/349594746_1694568097629810_5399586794046856493_n.jpg"
                alt=""
                width={36}
                height={36}
                className="rounded-full"
                aria-hidden="true"
              />
              <span style={{ fontFamily: 'var(--font-pacifico), cursive', fontWeight: 400 }}>Hola</span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className="px-4 py-2 text-sm font-medium rounded-sm transition-colors relative"
                        style={{
                          color: 'var(--color-text-primary)',
                          transitionDuration: 'var(--duration-instant)',
                          textDecoration: isActive
                            ? `underline 2px solid var(--color-brand)`
                            : 'none',
                          textUnderlineOffset: '4px',
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-semibold rounded-sm transition-colors"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: 'var(--color-text-on-brand)',
                  borderRadius: 'var(--radius-sm)',
                  transitionDuration: 'var(--duration-instant)',
                }}
              >
                Order on Facebook
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className="md:hidden p-2 -mr-2"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              style={{ color: 'var(--color-text-primary)' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
