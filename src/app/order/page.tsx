import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { OrderInquiryForm } from '@/components/forms/OrderInquiryForm';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { BRAND } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'Order Ensaymada & Bread Online | Cafe Hola Kapampangan Bakery',
  description:
    'Order freshly baked ensaymada, cheese bread, and more from Cafe Hola — the original Kapampangan bakery. Message us on Facebook or Instagram, or send an inquiry here.',
  path: '/order/',
});

export default function OrderPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Order', href: '/order/' },
        ])}
      />

      {/* Page header */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-base)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingTop: 'var(--spacing-8)',
          paddingBottom: 'var(--spacing-8)',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 var(--spacing-5)' }}>
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Order', href: '/order/' },
            ]}
          />

          {/* Yellow accent rule */}
          <div
            aria-hidden="true"
            style={{
              width: '40px',
              height: '3px',
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-pill)',
              marginTop: 'var(--spacing-5)',
              marginBottom: 'var(--spacing-4)',
            }}
          />

          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textWrap: 'balance',
            }}
          >
            Place an order
          </h1>
          <p
            style={{
              marginTop: 'var(--spacing-4)',
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              maxWidth: '52ch',
            }}
          >
            Fill out the form and we&apos;ll get back to you. Or skip it entirely
            and message us directly — that works too.
          </p>

          {/* Direct order buttons */}
          <div
            style={{
              marginTop: 'var(--spacing-6)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-3)',
            }}
          >
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hola-btn-primary"
            >
              <FacebookIcon size={18} />
              Message on Facebook
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hola-btn-outline"
            >
              <InstagramIcon size={18} />
              Message on Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Divider label */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-muted)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: 'var(--spacing-4) var(--spacing-5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          Or send us an inquiry
        </span>
      </div>

      {/* Form area */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-base)',
          paddingTop: 'var(--spacing-8)',
          paddingBottom: 'var(--spacing-8)',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 var(--spacing-5)' }}>
          <OrderInquiryForm />

          {/* Location note */}
          <div
            style={{
              marginTop: 'var(--spacing-8)',
              paddingTop: 'var(--spacing-6)',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                Pick up at any of our branches.
              </strong>{' '}
              <a
                href="/branches/"
                style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                See all {BRAND.location}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
