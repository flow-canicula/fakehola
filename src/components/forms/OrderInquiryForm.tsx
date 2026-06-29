'use client';

import { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { submitToFormspree, type FormspreeStatus } from '@/lib/formspree';
import { Honeypot } from './Honeypot';
import { Select, type SelectOption } from '@/components/ui/Select';
import { BRAND } from '@/content/site';
import { PRODUCTS } from '@/content/products';

const FORM_ID = process.env['NEXT_PUBLIC_FORMSPREE_ORDER_ID'] ?? '';

const PRODUCT_OPTIONS: SelectOption[] = [
  ...PRODUCTS.map((p) => ({ value: p.name, label: p.name })),
  { value: 'Multiple / Mixed', label: 'Multiple / Mixed' },
  { value: 'Gift / Pasalubong Box', label: 'Gift / Pasalubong Box' },
];

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 mt-2 text-sm font-medium"
      style={{ color: 'var(--color-error)' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
        <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  );
}

const baseInput: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '13px 16px',
  fontSize: 'var(--text-md)',
  color: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-surface-base)',
  border: '1.5px solid var(--color-border-subtle)',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-body)',
  minHeight: '52px',
  outline: 'none',
  transition: 'border-color 160ms cubic-bezier(0.2,0,0,1)',
  lineHeight: 1.5,
};

const errorBorder: React.CSSProperties = {
  borderColor: 'var(--color-error)',
};

export function OrderInquiryForm() {
  const uid = useId();
  const router = useRouter();

  const [status, setStatus] = useState<FormspreeStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [values, setValues] = useState({
    name: '',
    mobile: '',
    product: '',
    quantity: '1',
    preferredDate: '',
    message: '',
  });

  function set(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next['name'] = 'Enter your name.';
    if (!values.mobile.trim())
      next['mobile'] = 'Enter a mobile number we can reach you on.';
    else if (!/^[0-9+\-\s()]{7,20}$/.test(values.mobile))
      next['mobile'] = 'Enter a valid mobile number (e.g. 09171234567).';
    if (!values.product)
      next['product'] = "Select a product you're interested in.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    if (!FORM_ID) {
      setGlobalError(
        'Order form is not configured yet. Message us directly on Facebook or Instagram.'
      );
      return;
    }

    setStatus('loading');
    setGlobalError('');

    const result = await submitToFormspree(FORM_ID, {
      Name: values.name,
      Mobile: values.mobile,
      'Product Interest': values.product,
      Quantity: values.quantity,
      'Preferred Date': values.preferredDate,
      Message: values.message,
    });

    if (result.ok) {
      router.push('/order/thanks/');
    } else {
      setStatus('error');
      setGlobalError(
        result.errors?.[0]?.message ??
          'Something went wrong. Message us on Facebook or Instagram instead.'
      );
    }
  }

  const isLoading = status === 'loading';

  const focusBorder: React.CSSProperties = {
    borderColor: 'var(--color-ink)',
  };

  function inputStyle(field: string): React.CSSProperties {
    if (errors[field]) return { ...baseInput, ...errorBorder };
    if (focusedField === field) return { ...baseInput, ...focusBorder };
    return baseInput;
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Order inquiry form">
      <Honeypot />

      {/* Global error */}
      <div aria-live="polite" aria-atomic="true">
        {globalError && (
          <div
            role="alert"
            className="flex items-start gap-3 p-4 mb-8 text-sm font-medium"
            style={{
              backgroundColor: 'rgba(192,57,43,0.06)',
              border: '1.5px solid var(--color-error)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-error)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {globalError}
          </div>
        )}
      </div>

      {/* ── Your details ─────────────────────────────────────── */}
      <section aria-labelledby={`${uid}-details-heading`} style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2
          id={`${uid}-details-heading`}
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 'var(--spacing-5)',
            paddingBottom: 'var(--spacing-3)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          Your details
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
          {/* Name */}
          <div>
            <label
              htmlFor={`${uid}-name`}
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-2)',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              Full name{' '}
              <span aria-hidden="true" style={{ color: 'var(--color-error)', marginLeft: 1 }}>*</span>
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              value={values.name}
              onChange={(e) => set('name', e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              aria-describedby={errors['name'] ? `${uid}-name-error` : undefined}
              aria-invalid={!!errors['name']}
              disabled={isLoading}
              style={inputStyle('name')}
            />
            {errors['name'] && <FieldError id={`${uid}-name-error`} message={errors['name']} />}
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor={`${uid}-mobile`}
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-2)',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              Mobile / WhatsApp{' '}
              <span aria-hidden="true" style={{ color: 'var(--color-error)', marginLeft: 1 }}>*</span>
            </label>
            <input
              id={`${uid}-mobile`}
              name="mobile"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              required
              inputMode="tel"
              placeholder="09171234567"
              value={values.mobile}
              onChange={(e) => set('mobile', e.target.value)}
              onFocus={() => setFocusedField('mobile')}
              onBlur={() => setFocusedField(null)}
              aria-describedby={errors['mobile'] ? `${uid}-mobile-error` : undefined}
              aria-invalid={!!errors['mobile']}
              disabled={isLoading}
              style={inputStyle('mobile')}
            />
            {errors['mobile'] && <FieldError id={`${uid}-mobile-error`} message={errors['mobile']} />}
          </div>
        </div>
      </section>

      {/* ── Your order ───────────────────────────────────────── */}
      <section aria-labelledby={`${uid}-order-heading`} style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2
          id={`${uid}-order-heading`}
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 'var(--spacing-5)',
            paddingBottom: 'var(--spacing-3)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          Your order
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
          {/* Product */}
          <div>
            <label
              htmlFor={`${uid}-product`}
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-2)',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              What would you like?{' '}
              <span aria-hidden="true" style={{ color: 'var(--color-error)', marginLeft: 1 }}>*</span>
            </label>
            <Select
              id={`${uid}-product`}
              name="product"
              required
              options={PRODUCT_OPTIONS}
              value={values.product}
              onChange={(v) => set('product', v)}
              placeholder="Select a product"
              disabled={isLoading}
              aria-describedby={errors['product'] ? `${uid}-product-error` : undefined}
              aria-invalid={!!errors['product']}
              hasError={!!errors['product']}
              onFocus={() => setFocusedField('product')}
              onBlur={() => setFocusedField(null)}
            />
            {errors['product'] && <FieldError id={`${uid}-product-error`} message={errors['product']} />}
          </div>

          {/* Quantity + Preferred date — side by side on wider screens */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'var(--spacing-5)',
            }}
          >
            {/* Quantity */}
            <div>
              <label
                htmlFor={`${uid}-quantity`}
                style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-2)',
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Quantity
              </label>
              <input
                id={`${uid}-quantity`}
                name="quantity"
                type="number"
                min="1"
                max="999"
                inputMode="numeric"
                value={values.quantity}
                onChange={(e) => set('quantity', e.target.value)}
                onFocus={() => setFocusedField('quantity')}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
                style={inputStyle('quantity')}
              />
            </div>

            {/* Preferred date */}
            <div>
              <label
                htmlFor={`${uid}-preferredDate`}
                style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-2)',
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Preferred date or day
              </label>
              <input
                id={`${uid}-preferredDate`}
                name="preferredDate"
                type="text"
                maxLength={100}
                placeholder="e.g. This Saturday, Dec 25"
                value={values.preferredDate}
                onChange={(e) => set('preferredDate', e.target.value)}
                onFocus={() => setFocusedField('preferredDate')}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
                style={inputStyle('preferredDate')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Notes ────────────────────────────────────────────── */}
      <section aria-labelledby={`${uid}-notes-heading`} style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2
          id={`${uid}-notes-heading`}
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 'var(--spacing-5)',
            paddingBottom: 'var(--spacing-3)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          Anything else?
        </h2>

        <div>
          <label
            htmlFor={`${uid}-message`}
            style={{
              display: 'block',
              marginBottom: 'var(--spacing-2)',
              fontWeight: 500,
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-primary)',
            }}
          >
            Notes
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            maxLength={1000}
            placeholder="Delivery area, special requests, pickup preference, bulk order details…"
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            disabled={isLoading}
            style={{
              ...inputStyle('message'),
              resize: 'none',
              minHeight: 'unset',
              lineHeight: 1.6,
            }}
          />
        </div>
      </section>

      {/* Submit + social fallback */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="hola-btn-primary"
          style={{
            alignSelf: 'flex-start',
            minWidth: '200px',
            opacity: isLoading ? 0.75 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                <path d="M8 2a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            'Send my order details'
          )}
        </button>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Prefer to order directly?{' '}
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text-primary)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Facebook
          </a>{' '}
          or{' '}
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text-primary)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Instagram
          </a>{' '}
          DM is always open.
        </p>
      </div>
    </form>
  );
}
