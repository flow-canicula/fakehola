import { Hero } from '@/components/sections/Hero';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { PromoStrip } from '@/components/sections/PromoStrip';
import { HowToOrder } from '@/components/sections/HowToOrder';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { PRODUCTS } from '@/content/products';
import { getActivePromos } from '@/content/promos';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata();

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);
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
