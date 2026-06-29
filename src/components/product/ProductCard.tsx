import Image from 'next/image';
import type { Product } from '@/content/products';
import { FlavourTag } from './FlavourTag';
import { BRAND } from '@/content/site';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  variant?: 'grid' | 'featured';
}

export function ProductCard({
  product,
  onSelect,
  variant = 'grid',
}: ProductCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <article
      className="group flex flex-col rounded-md overflow-hidden transition-shadow"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        transitionDuration: 'var(--duration-base)',
        transitionTimingFunction: 'var(--easing-standard)',
        opacity: product.inStock ? 1 : 0.85,
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: isFeatured ? '4/3' : '16/9',
          borderRadius: `var(--radius-md) var(--radius-md) 0 0`,
        }}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading="lazy"
          sizes={
            isFeatured
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw'
          }
          className="object-cover transition-transform"
          style={{
            transitionDuration: 'var(--duration-base)',
            transitionTimingFunction: 'var(--easing-standard)',
            filter: product.inStock ? 'none' : 'grayscale(60%)',
          }}
          /* scale via group-hover in CSS so we don't need JS */
          onError={() => {
            /* fallback handled by next/image error boundary */
          }}
        />

        {/* Out-of-stock pill */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="px-4 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: 'var(--color-surface-dark)',
                color: 'var(--color-text-inverse)',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              Sold out
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Product tags">
            {product.tags.map((tag) => (
              <FlavourTag key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Name */}
        <h3
          className="font-bold"
          style={{
            fontSize: isFeatured ? 'var(--text-xl)' : 'var(--text-lg)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.25,
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="line-clamp-2 flex-1"
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.55,
          }}
        >
          {product.description}
        </p>

        {/* CTA */}
        <div className="pt-1">
          {product.inStock ? (
            <button
              type="button"
              onClick={() => onSelect?.(product)}
              className="w-full py-2.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: 'var(--color-text-on-brand)',
                borderRadius: 'var(--radius-sm)',
                transitionDuration: 'var(--duration-instant)',
                minHeight: '44px',
              }}
              aria-label={`Learn more about ${product.name}`}
            >
              Message to order
            </button>
          ) : (
            <p
              className="text-sm text-center py-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Fresh batch coming — message us to pre-order.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* Skeleton loader — used during intersection-observer deferred reveal */
export function ProductCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-md overflow-hidden animate-pulse"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
      }}
      aria-hidden="true"
    >
      <div
        className="w-full"
        style={{
          aspectRatio: '16/9',
          backgroundColor: 'var(--color-surface-muted)',
        }}
      />
      <div className="p-5 space-y-3">
        <div
          className="h-4 w-1/3 rounded"
          style={{ backgroundColor: 'var(--color-border-subtle)' }}
        />
        <div
          className="h-6 w-2/3 rounded"
          style={{ backgroundColor: 'var(--color-border-subtle)' }}
        />
        <div
          className="h-4 w-full rounded"
          style={{ backgroundColor: 'var(--color-border-subtle)' }}
        />
        <div
          className="h-10 w-full rounded"
          style={{ backgroundColor: 'var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}
        />
      </div>
    </div>
  );
}

export function ProductCardEmpty() {
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center py-16 px-8 text-center rounded-md"
      style={{
        backgroundColor: 'var(--color-surface-muted)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p
        className="text-lg font-semibold mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Fresh batch coming soon — message us to pre-order.
      </p>
      <p
        className="text-sm mb-6"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {BRAND.tagline}
      </p>
      <a
        href={BRAND.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 text-sm font-semibold"
        style={{
          backgroundColor: 'var(--color-brand)',
          color: 'var(--color-text-on-brand)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        Message us on Facebook
      </a>
    </div>
  );
}
