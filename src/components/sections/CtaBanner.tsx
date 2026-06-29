import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hola-btn-primary hola-btn-lg w-full sm:w-auto justify-center"
          >
            <FacebookIcon size={20} />
            Message us on Facebook
          </a>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hola-btn-ghost-light hola-btn-lg w-full sm:w-auto justify-center"
          >
            <InstagramIcon size={20} />
            Message us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
