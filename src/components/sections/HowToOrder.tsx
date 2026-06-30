import Link from 'next/link';
import { BRAND } from '@/content/site';
import { FoodpandaIcon } from '@/components/ui/SocialIcons';

const STEPS = [
  {
    number: '01',
    title: 'Browse the menu',
    description:
      "Check out our breads and treats on this page or the menu — always rising, always something new. See what's fresh and what you'd love to try.",
  },
  {
    number: '02',
    title: 'Message us on Facebook or Instagram',
    description:
      "Send us a direct message with what you'd like to order, your preferred quantity, and your delivery date.",
  },
  {
    number: '03',
    title: 'We confirm and bake fresh',
    description:
      "We'll confirm your order and bake it fresh for you. Kapampangan quality, every time.",
  },
  {
    number: '04',
    title: 'Delivery or pickup',
    description:
      'Receive your order at home or pick it up from the Hola branch nearest you — whatever works best for you.',
  },
] as const;

export function HowToOrder() {
  return (
    <section
      aria-label="How to order"
      className="py-20"
      style={{ backgroundColor: 'var(--color-surface-base)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            How to order
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Simple, personal, and guaranteed fresh.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
          {STEPS.map((step) => (
            <li key={step.number} className="flex flex-col gap-4">
              {/* Step number */}
              <span
                className="font-bold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-4xl)',
                  color: 'var(--color-brand)',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3
                className="font-semibold"
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Social links */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold whitespace-nowrap w-full sm:w-auto"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: 'var(--color-text-on-brand)',
                borderRadius: 'var(--radius-sm)',
                minHeight: '48px',
                fontSize: 'var(--text-md)',
              }}
            >
              Order on Facebook
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold border-2 whitespace-nowrap w-full sm:w-auto"
              style={{
                borderColor: 'var(--color-border-strong)',
                color: 'var(--color-text-primary)',
                borderRadius: 'var(--radius-sm)',
                minHeight: '48px',
                fontSize: 'var(--text-md)',
              }}
            >
              Order on Instagram
            </a>
            <a
              href={BRAND.foodpanda}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold whitespace-nowrap w-full sm:w-auto"
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
          <Link
            href="/order/"
            className="inline-flex items-center justify-center px-7 py-3.5 font-semibold"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-md)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              minHeight: '48px',
            }}
          >
            Send an inquiry form instead
          </Link>
        </div>
      </div>
    </section>
  );
}
