import { SITE_URL, BRAND } from '@/content/site';
import type { Product } from '@/content/products';

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: BRAND.name,
    alternateName: BRAND.shortName,
    url: SITE_URL,
    description:
      'The original Kapampangan bakery. Freshly baked Creamcheese Ensaymadness, ube sapin-sapin, and pillow-soft breads — genuine and authentic, with 20 branches across Luzon.',
    telephone: '09451502869',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Don Juan Nepomuceno Ave., Nepo Center',
      addressLocality: 'Angeles City',
      addressRegion: 'Pampanga',
      addressCountry: 'PH',
    },
    openingHours: 'Mo-Su 07:00-21:00',
    servesCuisine: ['Filipino', 'Kapampangan'],
    priceRange: '₱₱',
    sameAs: [BRAND.facebook, BRAND.instagram],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '07:00',
        closes: '21:00',
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    alternateName: ['Hola Bakery', 'Hola Cafe', 'Cafe Hola Pampanga'],
    url: SITE_URL,
    description:
      'The original Kapampangan bakery. Freshly baked Creamcheese Ensaymadness, cheese bread, and pillow-soft bread — born in Angeles City, Pampanga, with 20 branches across Luzon.',
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; href: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function buildProductListSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${BRAND.name} Menu`,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `${SITE_URL}${product.image}`,
        brand: {
          '@type': 'Brand',
          name: BRAND.name,
        },
        offers: {
          '@type': 'Offer',
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          priceCurrency: 'PHP',
          seller: {
            '@type': 'Organization',
            name: BRAND.name,
          },
        },
      },
    })),
  };
}
