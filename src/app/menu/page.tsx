import { ProductGrid } from '@/components/sections/ProductGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { PRODUCTS } from '@/content/products';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema, buildProductListSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Menu',
  description:
    'Browse the full Cafe Hola menu — ensaymada, ube sapin-sapin, pillow-soft bread, and Hola Coffee. Order via Facebook or Instagram.',
  path: '/menu/',
});

export default function MenuPage() {
  return (
    <>
      <JsonLd
        schema={[
          buildProductListSchema(PRODUCTS),
          buildBreadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Menu', href: '/menu/' },
          ]),
        ]}
      />

      <div
        className="py-12"
        style={{ backgroundColor: 'var(--color-surface-muted)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Menu', href: '/menu/' },
            ]}
          />
          <h1
            className="mt-2 font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Our full menu
          </h1>
          <p
            className="mt-3 max-w-xl"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Kapampangan breads and treats, baked fresh. Message us on Facebook or
            Instagram to order.
          </p>
        </div>
      </div>

      <ProductGrid products={PRODUCTS} heading="Everything on the menu" />
      <CtaBanner />
    </>
  );
}
