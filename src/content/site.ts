export const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://holabakery.skaldris.com';

export const BRAND = {
  name: 'Cafe Hola',
  shortName: 'Hola',
  tagline: 'Basta Hola, Manyaman!',
  taglineTranslation: 'With Hola, it\'s delicious!',
  origin: 'Pampanga, Philippines',
  location: '20 branches across Luzon',
  flagship: 'Don Juan Nepomuceno Ave., Nepo Center, Angeles City, Pampanga',
  phone: '0945 150 2869',
  hours: 'Open daily, 7:00 AM – 9:00 PM',
  facebook: 'https://www.facebook.com/TheCafeHola',
  instagram: 'https://www.instagram.com/cafe_hola2020/',
  foodpanda: 'https://www.foodpanda.ph/restaurant/bspe/hola-waltermart',
  facebookHandle: 'TheCafeHola',
  instagramHandle: 'cafe_hola2020',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
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
