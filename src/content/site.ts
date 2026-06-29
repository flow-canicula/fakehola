export const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://holabakery.skaldris.com';

export const BRAND = {
  name: 'Cafe Hola',
  shortName: 'Hola',
  tagline: 'Basta Hola, Manyaman!',
  taglineTranslation: 'With Hola, it\'s delicious!',
  origin: 'Pampanga, Philippines',
  location: '20 branches across Luzon',
  flagship: 'Don Juan Nepomuceno Ave., Angeles City, Pampanga',
  facebook: 'https://www.facebook.com/TheCafeHola',
  instagram: 'https://www.instagram.com/cafe_hola2020/',
  facebookHandle: 'TheCafeHola',
  instagramHandle: 'cafe_hola2020',
} as const;

export const NAV_LINKS = [
  { label: 'Menu', href: '/menu/' },
  { label: 'Branches', href: '/branches/' },
  { label: 'Order', href: '/order/' },
  { label: 'About', href: '/about/' },
] as const;

export const OG_DEFAULTS = {
  title: 'Cafe Hola — The Original Kapampangan Bakery.',
  description:
    'The original Kapampangan bakery. Freshly baked Creamcheese Ensaymadness, pillow-soft bread, and authentic kakanin — 20 branches across Luzon. Order on Facebook or Instagram.',
  image: `${SITE_URL}/og/default.jpg`,
  imageWidth: 1200,
  imageHeight: 630,
} as const;
