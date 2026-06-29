import { FacebookIcon, InstagramIcon, FoodpandaIcon } from '@/components/ui/SocialIcons';
import { BRAND } from '@/content/site';

export function CtaBanner() {
  return (
    <section
      aria-label="Order now"
      className="py-20"
      style={{ backgroundColor: 'var(--color-surface-dark)' }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2
          className="font-bold"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-text-inverse)',
            letterSpacing: '-0.02em',
          }}
        >
          Ready to order?
        </h2>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.65,
          }}
        >
          Send us a message on Facebook or Instagram and we'll get back to you
          with freshly baked details.
        </p>

        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hola-btn-primary hola-btn-lg w-full sm:w-auto justify-center whitespace-nowrap"
            >
              <FacebookIcon size={20} />
              Message on Facebook
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hola-btn-ghost-light hola-btn-lg w-full sm:w-auto justify-center whitespace-nowrap"
            >
              <InstagramIcon size={20} />
              Message on Instagram
            </a>
          </div>
          <a
            href={BRAND.foodpanda}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold whitespace-nowrap"
            style={{
              backgroundColor: '#D70F64',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              minHeight: '48px',
              fontSize: 'var(--text-md)',
            }}
          >
            <FoodpandaIcon size={20} />
            Order on Foodpanda
          </a>
        </div>
      </div>
    </section>
  );
}
