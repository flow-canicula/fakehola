'use client';

import dynamic from 'next/dynamic';
import type { Region } from '@/content/branches';

const BranchMap = dynamic(
  () => import('@/components/branches/BranchMap').then((m) => m.BranchMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: 'clamp(360px, 55vh, 520px)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-surface-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-sm)',
        }}
        aria-hidden="true"
      >
        Loading map…
      </div>
    ),
  }
);

export function BranchMapLoader({ regions }: { regions: Region[] }) {
  return <BranchMap regions={regions} />;
}
