'use client';

import { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { submitToFormspree, type FormspreeStatus } from '@/lib/formspree';
import { Honeypot } from './Honeypot';
import { Select, type SelectOption } from '@/components/ui/Select';
import { BRAND } from '@/content/site';

const FORM_ID = process.env['NEXT_PUBLIC_FORMSPREE_FRANCHISE_ID'] ?? '';

const BUDGET_OPTIONS: SelectOption[] = [
  { value: 'Under ₱1M', label: 'Under ₱1M' },
  { value: '₱1M – ₱3M', label: '₱1M – ₱3M' },
  { value: '₱3M – ₱5M', label: '₱3M – ₱5M' },
  { value: 'Above ₱5M', label: 'Above ₱5M' },
  { value: 'Not sure yet', label: 'Not sure yet' },
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

export function FranchiseInquiryForm() {
  const uid = useId();
  const router = useRouter();

  const [status, setStatus] = useState<FormspreeStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [values, setValues] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    budget: '',
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
    if (!values.email.trim()) next['email'] = 'Enter an email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next['email'] = 'Enter a valid email address.';
    if (!values.location.trim())
      next['location'] = 'Enter your target city or area.';
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
        'Franchise inquiry form is not configured yet. Message us directly on Facebook or Instagram.'
      );
      return;
    }

    setStatus('loading');
    setGlobalError('');

    const result = await submitToFormspree(FORM_ID, {
      Name: values.name,
      Mobile: values.mobile,
      Email: values.email,
      'Target Location': values.location,
      'Investment Budget': values.budget,
      Message: values.message,
      Subject: 'New franchise inquiry',
    });

    if (result.ok) {
      router.push('/franchising/thanks/');
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
    <form onSubmit={handleSubmit} noValidate aria-label="Franchise inquiry form">
      <Honeypot />

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

          {/* Mobile + Email */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--spacing-5)',
            }}
          >
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

            <div>
              <label
                htmlFor={`${uid}-email`}
                style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-2)',
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Email{' '}
                <span aria-hidden="true" style={{ color: 'var(--color-error)', marginLeft: 1 }}>*</span>
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={150}
                required
                placeholder="you@email.com"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                aria-describedby={errors['email'] ? `${uid}-email-error` : undefined}
                aria-invalid={!!errors['email']}
                disabled={isLoading}
                style={inputStyle('email')}
              />
              {errors['email'] && <FieldError id={`${uid}-email-error`} message={errors['email']} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── Your plans ───────────────────────────────────────── */}
      <section aria-labelledby={`${uid}-plans-heading`} style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2
          id={`${uid}-plans-heading`}
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
          Your plans
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
          {/* Target location */}
          <div>
            <label
              htmlFor={`${uid}-location`}
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-2)',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              Target city or area{' '}
              <span aria-hidden="true" style={{ color: 'var(--color-error)', marginLeft: 1 }}>*</span>
            </label>
            <input
              id={`${uid}-location`}
              name="location"
              type="text"
              maxLength={150}
              required
              placeholder="e.g. Cebu City, Davao, Baguio"
              value={values.location}
              onChange={(e) => set('location', e.target.value)}
              onFocus={() => setFocusedField('location')}
              onBlur={() => setFocusedField(null)}
              aria-describedby={errors['location'] ? `${uid}-location-error` : undefined}
              aria-invalid={!!errors['location']}
              disabled={isLoading}
              style={inputStyle('location')}
            />
            {errors['location'] && <FieldError id={`${uid}-location-error`} message={errors['location']} />}
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor={`${uid}-budget`}
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-2)',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              Investment budget
            </label>
            <Select
              id={`${uid}-budget`}
              name="budget"
              options={BUDGET_OPTIONS}
              value={values.budget}
              onChange={(v) => set('budget', v)}
              placeholder="Select a range"
              disabled={isLoading}
              onFocus={() => setFocusedField('budget')}
              onBlur={() => setFocusedField(null)}
            />
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
          Tell us more
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
            Message
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            maxLength={1000}
            placeholder="Your background, timeline, or any questions about franchising with Hola…"
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
            minWidth: '240px',
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
            'Send franchise inquiry'
          )}
        </button>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Prefer to talk first?{' '}
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
