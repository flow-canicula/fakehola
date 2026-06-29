import { Hero } from '@/components/sections/Hero';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { PromoStrip } from '@/components/sections/PromoStrip';
import { HowToOrder } from '@/components/sections/HowToOrder';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { PRODUCTS } from '@/content/products';
import { getActivePromos } from '@/content/promos';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Cafe Hola — The Original Kapampangan Bakery | Ensaymada, Cheese Bread & Coffee',
  description:
    'Cafe Hola is the original Kapampangan bakery from Pampanga. Freshly baked Creamcheese Ensaymadness, cheese bread bites, pillow-soft bread, and Hola Coffee — 20 branches across Luzon. Order on Facebook or Instagram.',
  path: '/',
});

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(
    (p) => ['Ensaymadness', 'Cheese Bread Bites', 'Cheese Rolls', 'Hola Bars'].includes(p.category)
  ).slice(0, 4);
  const activePromos = getActivePromos();

  return (
    <>
      <Hero />
      <ProductGrid products={featuredProducts} heading="Our Breads & Treats" />
      <PromoStrip promos={activePromos} />
      <HowToOrder />
      <CtaBanner />
    </>
  );
}
