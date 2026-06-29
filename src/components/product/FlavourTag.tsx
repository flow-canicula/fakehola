import type { FlavourTag as FlavourTagType } from '@/content/products';

const TAG_CONFIG: Record<FlavourTagType, { label: string; style: React.CSSProperties }> = {
  bestseller: {
    label: 'Bestseller',
    style: {
      backgroundColor: 'var(--color-brand)',
      color: 'var(--color-text-on-brand)',
    },
  },
  ube: {
    label: 'Ube',
    style: {
      backgroundColor: 'var(--color-ube)',
      color: '#FFFFFF',
    },
  },
  kakanin: {
    label: 'Kakanin',
    style: {
      backgroundColor: 'var(--color-brown)',
      color: '#FFFFFF',
    },
  },
  'coffee-pairing': {
    label: 'Coffee Pairing',
    style: {
      backgroundColor: 'var(--color-surface-muted)',
      color: 'var(--color-brown)',
      border: '1px solid var(--color-border-subtle)',
    },
  },
  everyday: {
    label: 'Everyday',
    style: {
      backgroundColor: 'var(--color-surface-muted)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border-subtle)',
    },
  },
  gifting: {
    label: 'Gifting',
    style: {
      backgroundColor: 'var(--color-ink)',
      color: '#FFFFFF',
    },
  },
  starter: {
    label: 'Starter',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  main: {
    label: 'Main',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  pasta: {
    label: 'Pasta',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  breakfast: {
    label: 'Breakfast',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  'hot-drinks': {
    label: 'Hot',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  'iced-drinks': {
    label: 'Iced',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  frappe: {
    label: 'Frappe',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  'non-coffee': {
    label: 'Non-Coffee',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' },
  },
  ensaymada: {
    label: 'Ensaymada',
    style: { backgroundColor: 'var(--color-brand)', color: 'var(--color-text-on-brand)' },
  },
  bread: {
    label: 'Bread',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-brown)', border: '1px solid var(--color-border-subtle)' },
  },
  cheese: {
    label: 'Cheese',
    style: { backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-brown)', border: '1px solid var(--color-border-subtle)' },
  },
};

interface FlavourTagProps {
  tag: FlavourTagType;
}

export function FlavourTag({ tag }: FlavourTagProps) {
  const config = TAG_CONFIG[tag];

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs font-semibold"
      style={{
        ...config.style,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.02em',
        lineHeight: '1.6',
      }}
    >
      {config.label}
    </span>
  );
}
