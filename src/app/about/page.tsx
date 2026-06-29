import Image from 'next/image';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { BRAND } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Cafe Hola is the original Kapampangan bakery — freshly baked Creamcheese Ensaymadness, ube sapin-sapin, and pillow-soft bread, genuine and authentic. 20 branches across Luzon.',
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
            An original brand from Pampanga
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
            {/* Photography */}
            <div
              className="relative"
              style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
            >
              <Image
                src="/assets/photos/546331655_1371869878276530_4573038799687110187_n.jpg"
                alt="Three Hola ensaymada variants on a wooden board — classic cheese, cream cheese, and ube — dusted with toppings"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div className="space-y-6">
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--color-brown)',
                }}
              >
                Be captivated by Hola
              </p>

              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.75,
                }}
              >
                An original brand from Pampanga — now loved by Filipinos
                worldwide. Hola was born from the culinary heart of the
                Philippines, where food is culture and every bite tells a story.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-md)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                }}
              >
                We bring the warmth of a neighborhood bakery across the Philippines,
                with ensaymada baked soft and buttery, sapin-sapin layered in
                vibrant ube and coconut, and pillow-soft bread that pairs
                perfectly with our bold Hola Coffee.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-md)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                }}
              >
                Our current home is at{' '}
                <strong style={{ color: 'var(--color-text-primary)' }}>
                  {BRAND.location}
                </strong>
                . Order through Facebook or Instagram and we'll take it from
                there — freshly baked, delivered to you.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', paddingTop: 'var(--spacing-3)' }}>
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

      {/* Values strip */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-surface-muted)' }}
        aria-label="What makes Hola different"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Kapampangan roots',
                body: 'Our recipes come from Pampanga — a province famous for setting the table of Filipino cuisine.',
              },
              {
                title: 'Baked fresh',
                body: 'We bake to order. No day-old bread, no compromises on freshness or quality.',
              },
              {
                title: 'Warm and neighborly',
                body: 'From our kitchen to yours — every order is personal, every bite is made with care.',
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
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
