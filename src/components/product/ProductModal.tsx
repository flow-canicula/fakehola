'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Product } from '@/content/products';
import { FlavourTag } from './FlavourTag';
import { BRAND } from '@/content/site';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Focus trap + Esc */
  useEffect(() => {
    if (!product) return;

    closeRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const el = dialogRef.current;
      if (!el) return;

      const focusable = el.querySelectorAll<HTMLElement>(
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
  }, [product, onClose]);

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(26,26,26,0.6)' }}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-lg flex flex-col overflow-hidden max-h-[90vh]"
          style={{
            backgroundColor: 'var(--color-surface-base)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close product details"
            className="absolute top-4 right-4 z-10 p-2"
            style={{
              backgroundColor: 'var(--color-surface-base)',
              borderRadius: 'var(--radius-pill)',
              boxShadow: 'var(--shadow-sm)',
              color: 'var(--color-text-primary)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3L13 13M13 3L3 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative w-full flex-shrink-0" style={{ aspectRatio: '4/3' }}>
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex flex-col overflow-y-auto p-6 gap-4">
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <FlavourTag key={tag} tag={tag} />
                ))}
              </div>
            )}

            <h2
              id="product-modal-title"
              className="font-bold"
              style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)' }}
            >
              {product.name}
            </h2>

            <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              {product.longDescription}
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 font-semibold text-sm"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: 'var(--color-text-on-brand)',
                  borderRadius: 'var(--radius-sm)',
                  minHeight: '44px',
                }}
              >
                Order on Facebook
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 font-semibold text-sm border-2"
                style={{
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  minHeight: '44px',
                }}
              >
                Order on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
