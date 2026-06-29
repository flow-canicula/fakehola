'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_LINKS, BRAND } from '@/content/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* Focus trap + Esc to close */
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-y-0 right-0 z-50 w-72 bg-surface-base flex flex-col shadow-md"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <span
            className="font-bold text-lg"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {BRAND.shortName}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-sm -mr-2 transition-colors"
            style={{
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation">
          <ul className="py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center px-6 py-4 text-lg font-medium transition-colors"
                  style={{
                    color: 'var(--color-text-primary)',
                    transitionDuration: 'var(--duration-instant)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social CTAs */}
        <div
          className="mt-auto px-6 pb-8 pt-4 border-t space-y-3"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3 font-semibold text-sm rounded-sm transition-colors"
            style={{
              backgroundColor: 'var(--color-brand)',
              color: 'var(--color-text-on-brand)',
              borderRadius: 'var(--radius-sm)',
              transitionDuration: 'var(--duration-instant)',
            }}
          >
            Order on Facebook
          </a>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3 font-semibold text-sm border-2 rounded-sm transition-colors"
            style={{
              borderColor: 'var(--color-border-strong)',
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-sm)',
              transitionDuration: 'var(--duration-instant)',
            }}
          >
            Order on Instagram
          </a>
        </div>
      </div>
    </>
  );
}
