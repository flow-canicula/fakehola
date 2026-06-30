'use client';

import { useId, useState } from 'react';

export interface MultiSelectQuantityOption {
  value: string;
  label: string;
  group?: string;
}

export interface MultiSelectQuantityItem {
  value: string;
  quantity: string;
}

interface MultiSelectQuantityProps {
  id?: string;
  options: MultiSelectQuantityOption[];
  items: MultiSelectQuantityItem[];
  onChange: (items: MultiSelectQuantityItem[]) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  'aria-describedby'?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function MultiSelectQuantity({
  id,
  options,
  items,
  onChange,
  placeholder = 'Select products',
  disabled = false,
  hasError,
  'aria-describedby': ariaDescribedby,
  onFocus,
  onBlur,
}: MultiSelectQuantityProps) {
  const [open, setOpen] = useState(false);
  const listboxId = useId();

  const selectedValues = new Set(items.map((i) => i.value));

  function toggle(value: string) {
    if (selectedValues.has(value)) {
      onChange(items.filter((i) => i.value !== value));
    } else {
      onChange([...items, { value, quantity: '1' }]);
    }
  }

  function setQuantity(value: string, quantity: string) {
    onChange(items.map((i) => (i.value === value ? { ...i, quantity } : i)));
  }

  function remove(value: string) {
    onChange(items.filter((i) => i.value !== value));
  }

  const borderColor = hasError ? 'var(--color-error)' : 'var(--color-border-subtle)';

  return (
    <div>
      {/* Trigger */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        onClick={() => {
          setOpen((o) => !o);
          onFocus?.();
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '13px 16px',
          fontSize: 'var(--text-md)',
          fontFamily: 'var(--font-body)',
          color: items.length > 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          backgroundColor: disabled ? 'var(--color-surface-muted)' : 'var(--color-surface-base)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: open ? 'var(--radius-sm) var(--radius-sm) 0 0' : 'var(--radius-sm)',
          minHeight: '52px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          outline: 'none',
          transition: 'border-color 160ms cubic-bezier(0.2,0,0,1)',
        }}
      >
        <span style={{ lineHeight: 1.4 }}>
          {items.length > 0 ? `${items.length} product${items.length > 1 ? 's' : ''} selected` : placeholder}
        </span>
        <span
          aria-hidden="true"
          style={{
            display: 'flex',
            flexShrink: 0,
            marginLeft: 'var(--spacing-3)',
            color: 'var(--color-text-secondary)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms cubic-bezier(0.2,0,0,1)',
          }}
        >
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M1 1L5.5 6L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Checklist dropdown */}
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-multiselectable="true"
          aria-label={placeholder}
          style={{
            margin: 0,
            padding: 'var(--spacing-2) 0',
            listStyle: 'none',
            backgroundColor: 'var(--color-surface-base)',
            border: '1.5px solid var(--color-ink)',
            borderTop: 'none',
            borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
            maxHeight: '280px',
            overflowY: 'auto',
          }}
        >
          {options.map((opt) => {
            const isSelected = selectedValues.has(opt.value);
            return (
              <li key={opt.value} role="option" aria-selected={isSelected}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-3)',
                    padding: '11px 16px',
                    fontSize: 'var(--text-md)',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    backgroundColor: isSelected ? 'rgba(242,183,5,0.10)' : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(opt.value)}
                    style={{
                      width: '18px',
                      height: '18px',
                      flexShrink: 0,
                      accentColor: 'var(--color-brand-strong)',
                    }}
                  />
                  {opt.label}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {/* Selected items with per-product quantity */}
      {items.length > 0 && (
        <ul style={{ marginTop: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {items.map((item) => {
            const opt = options.find((o) => o.value === item.value);
            if (!opt) return null;
            return (
              <li
                key={item.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-3)',
                  padding: '10px 14px',
                  border: '1.5px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-muted)',
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {opt.label}
                </span>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Qty
                  <input
                    type="number"
                    min="1"
                    max="999"
                    inputMode="numeric"
                    value={item.quantity}
                    onChange={(e) => setQuantity(item.value, e.target.value)}
                    disabled={disabled}
                    style={{
                      width: '64px',
                      padding: '6px 8px',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-primary)',
                      backgroundColor: 'var(--color-surface-base)',
                      border: '1.5px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      outline: 'none',
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => remove(item.value)}
                  disabled={disabled}
                  aria-label={`Remove ${opt.label}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    flexShrink: 0,
                    color: 'var(--color-text-secondary)',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
