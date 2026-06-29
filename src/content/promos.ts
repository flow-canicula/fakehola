export interface Promo {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  ctaHref: string;
  /** ISO date string — if set, promo is hidden after this date */
  expires?: string;
}

export const PROMOS: Promo[] = [
  {
    id: 'perfect-pair',
    eyebrow: 'Perfect Pair',
    title: 'Ensaymadness + Hola Coffee',
    copy: 'The classic combination: soft, buttery ensaymada and a bold cup of hot black coffee. Message us on Facebook or Instagram to order your pair today.',
    cta: 'Order on Facebook',
    ctaHref: 'https://www.facebook.com/TheCafeHola',
  },
  {
    id: 'pasalubong-box',
    eyebrow: 'Share the love',
    title: 'Gifting & Pasalubong',
    copy: 'Bring Kapampangan flavors home. Our Ube Sapin-Sapin Box makes the perfect pasalubong, team gift, or celebration treat. Ask us about bulk orders.',
    cta: 'Message on Instagram',
    ctaHref: 'https://www.instagram.com/cafe_hola2020/',
  },
];

export function getActivePromos(): Promo[] {
  const now = new Date();
  return PROMOS.filter((p) => {
    if (!p.expires) return true;
    return new Date(p.expires) > now;
  });
}
