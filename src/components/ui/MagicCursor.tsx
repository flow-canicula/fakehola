'use client';

import { useEffect, useRef, useState } from 'react';

export function MagicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setMounted(true);
    document.documentElement.style.cursor = 'none';

    let isHovered = false;
    let isClicked = false;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element;
      isHovered = !!t.closest('a, button, [role="button"], input, select, textarea, label');
    };

    const onLeave = () => { isHovered = false; };
    const onDown = () => { isClicked = true; };
    const onUp = () => { isClicked = false; };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });
    document.addEventListener('mousedown', onDown, { passive: true });
    document.addEventListener('mouseup', onUp, { passive: true });

    const LERP_SPEED = 0.13;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, LERP_SPEED);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, LERP_SPEED);

      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        const dotScale = isClicked ? 0.5 : isHovered ? 1.6 : 1;
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${dotScale})`;
        dot.style.backgroundColor = isHovered
          ? 'var(--color-brand)'
          : 'var(--color-ink)';
        dot.style.opacity = isClicked ? '0.5' : '1';
      }

      if (ring) {
        const ringScale = isHovered ? 1.3 : 1;
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${ringScale})`;
        ring.style.borderColor = isHovered
          ? 'var(--color-brand)'
          : 'var(--color-ink)';
        ring.style.opacity = isHovered ? '0.65' : '0.28';
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-ink)',
          opacity: 1,
          willChange: 'transform',
          transition: 'background-color 160ms cubic-bezier(0.2,0,0,1), opacity 160ms cubic-bezier(0.2,0,0,1)',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: 'none',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '1.5px solid var(--color-ink)',
          opacity: 0.28,
          willChange: 'transform',
          transition: 'border-color 220ms cubic-bezier(0.2,0,0,1), opacity 220ms cubic-bezier(0.2,0,0,1)',
        }}
      />
    </>
  );
}
