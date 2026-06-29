import Image from 'next/image';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { BRAND } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'About Cafe Hola — Original Kapampangan Bakery from Pampanga, Philippines',
  description:
    'Cafe Hola is the original Kapampangan bakery born in Angeles City, Pampanga. Freshly baked Creamcheese Ensaymadness, cheese bread, and pillow-soft bread — genuine, authentic, and now 20 branches across Luzon.',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about/' },
        ])}
      />

      {/* Page header */}
      <div
        className="py-12"
        style={{ backgroundColor: 'var(--color-surface-muted)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about/' },
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
            The original Kapampangan bakery
          </h1>
        </div>
      </div>

      {/* Story section */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
        aria-label="Brand story"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* In-store photo */}
            <div
              className="relative"
              style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
            >
              <Image
                src="/assets/photos/544964377_1368126458650872_1136813160580203494_n.jpg"
                alt="The Hola circle mark mounted on the signature yellow wall inside a Cafe Hola branch"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div className="space-y-6">
              <p
                style={{
                  fontFamily: 'var(--font-pacifico), cursive',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--color-brown)',
                  fontWeight: 400,
                }}
              >
                Born in Pampanga. Loved across the Philippines.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.75,
                }}
              >
                Cafe Hola started with a simple idea — bring the genuine flavors
                of Kapampangan baking to every Filipino table. From our flagship
                on Don Juan Nepomuceno Ave. in Angeles City, we've grown to
                20 branches across Luzon, and the recipe has never changed.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-md)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                }}
              >
                Every ensaymada is baked soft and buttery, every box of cheese
                bread bites is pulled fresh from the oven, and every cup of Hola
                Coffee is brewed to pair perfectly with our breads. Pampanga is
                the culinary capital of the Philippines — and we carry that
                pride in everything we make.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-md)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                }}
              >
                Order through Facebook or Instagram — we'll bake it fresh and
                get it to you. <em>Basta Hola, Manyaman!</em>
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hola-btn-primary"
                >
                  <FacebookIcon size={18} />
                  Follow on Facebook
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hola-btn-outline"
                >
                  <InstagramIcon size={18} />
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details strip */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-surface-muted)' }}
        aria-label="Store details"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Flagship store',
                body: 'Don Juan Nepomuceno Ave., Nepo Center, Angeles City, Pampanga',
              },
              {
                title: 'Store hours',
                body: 'Open daily, 7:00 AM – 9:00 PM',
              },
              {
                title: 'Call us',
                body: '0945 150 2869',
              },
              {
                title: '20 branches across Luzon',
                body: 'Pampanga, Metro Manila, Bulacan, Rizal, Batangas, Bataan, Tarlac, Nueva Ecija, and Olongapo.',
              },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <h2
                  className="font-bold"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-md)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
        aria-label="What makes Hola different"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Kapampangan roots',
                body: 'Our recipes come from Pampanga — the culinary capital of the Philippines, where every dish is made with pride and purpose.',
              },
              {
                title: 'Baked fresh',
                body: 'No day-old bread. No shortcuts. Every ensaymada, every cheese roll, and every bread bite is baked to order.',
              },
              {
                title: 'Warm and neighborly',
                body: 'From our kitchen to your door — every order is personal. That\'s the Hola way, and it hasn\'t changed since day one.',
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <div
                  style={{
                    width: 40,
                    height: 4,
                    backgroundColor: 'var(--color-brand)',
                    borderRadius: 'var(--radius-pill)',
                  }}
                />
                <h2
                  className="font-bold"
                  style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
