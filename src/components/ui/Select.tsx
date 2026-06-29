'use client';

import { useState, useRef, useEffect, useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

interface SelectProps {
  id: string;
  name: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  hasError?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function Select({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  required,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  hasError,
  onFocus,
  onBlur,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedIndex >= 0 && options[focusedIndex]) {
          const opt = options[focusedIndex];
          if (opt) {
            onChange(opt.value);
            setOpen(false);
            triggerRef.current?.focus();
          }
        }
      } else if (e.key === 'Tab') {
        setOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, focusedIndex, options, onChange, onBlur]);

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focusedIndex < 0) return;
    const item = listRef.current?.children[focusedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [focusedIndex, open]);

  // Reset focused index when opening
  const handleOpen = () => {
    if (disabled) return;
    const currentIndex = options.findIndex((o) => o.value === value);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    setOpen(true);
    onFocus?.();
  };

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setOpen(false);
    onBlur?.();
    triggerRef.current?.focus();
  };

  const borderColor = hasError
    ? 'var(--color-error)'
    : isFocused || open
    ? 'var(--color-ink)'
    : 'var(--color-border-subtle)';

  return (
    <div style={{ position: 'relative' }}>
      {/* Hidden native select for form submission */}
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        onClick={handleOpen}
        onFocus={() => { setIsFocused(true); onFocus?.(); }}
        onBlur={() => { if (!open) { setIsFocused(false); onBlur?.(); } }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '13px 16px',
          fontSize: 'var(--text-md)',
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          color: selected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          backgroundColor: disabled ? 'var(--color-surface-muted)' : 'var(--color-surface-base)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: open ? 'var(--radius-sm) var(--radius-sm) 0 0' : 'var(--radius-sm)',
          minHeight: '52px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          outline: 'none',
          transition: 'border-color 160ms cubic-bezier(0.2,0,0,1)',
          userSelect: 'none',
        }}
      >
        <span style={{ lineHeight: 1.4 }}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
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

      {/* Dropdown listbox */}
      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            margin: 0,
            padding: 'var(--spacing-2) 0',
            listStyle: 'none',
            backgroundColor: 'var(--color-surface-base)',
            border: '1.5px solid var(--color-ink)',
            borderTop: 'none',
            borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
            maxHeight: '280px',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isFocusedItem = i === focusedIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setFocusedIndex(i)}
                style={{
                  padding: '11px 16px',
                  fontSize: 'var(--text-md)',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  color: isSelected
                    ? 'var(--color-ink)'
                    : 'var(--color-text-primary)',
                  backgroundColor: isFocusedItem
                    ? 'var(--color-surface-muted)'
                    : isSelected
                    ? 'rgba(242,183,5,0.10)'
                    : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 100ms',
                  userSelect: 'none',
                }}
              >
                {opt.label}
                {isSelected && (
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
                    <path d="M1 5.5L5 9.5L13 1.5" stroke="var(--color-brand-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
