'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Product } from '@/content/products';
import { ProductCard, ProductCardEmpty } from '@/components/product/ProductCard';

const ProductModal = dynamic(
  () => import('@/components/product/ProductModal').then((m) => m.ProductModal),
  { ssr: false }
);

interface ProductGridProps {
  products: Product[];
  heading?: string;
}

export function ProductGrid({
  products,
  heading = 'Our Breads & Treats',
}: ProductGridProps) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section
      aria-label="Product menu"
      className="py-20"
      style={{ backgroundColor: 'var(--color-surface-base)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center space-y-3">
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Tap a card to learn more, then message us to order.
          </p>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="grid grid-cols-1">
            <ProductCardEmpty />
          </div>
        ) : (
          <ul
            role="list"
            className="grid gap-6"
            style={{
              gridTemplateColumns:
                'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            }}
          >
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  onSelect={setSelected}
                  variant="grid"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lazy-loaded modal — only mounts on first selection */}
      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
