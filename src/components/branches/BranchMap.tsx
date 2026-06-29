'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import type { Region } from '@/content/branches';

/* Coordinates keyed by branch id */
const COORDS: Record<string, [number, number]> = {
  'angeles-flagship':   [15.1449,  120.5887],
  'sm-clark':           [15.1800,  120.5541],
  'sm-pampanga':        [15.0793,  120.6199],
  'san-fernando':       [15.0287,  120.6923],
  'guagua':             [14.9695,  120.6367],
  'sm-baliwag':         [14.9546,  120.9001],
  'sm-marilao':         [14.7584,  120.9490],
  'edsa-shangrila':     [14.5794,  121.0559],
  'sm-fairview':        [14.7432,  121.0584],
  'sm-south-mall':      [14.4506,  120.9934],
  'sm-grand-central':   [14.6566,  120.9833],
  'ayala-feliz':        [14.6091,  121.0882],
  'antipolo':           [14.5832,  121.1765],
  'olongapo':           [14.8297,  120.2827],
  'cabanatuan':         [15.4882,  120.9668],
  'sm-tarlac':          [15.4756,  120.5965],
  'concepcion-tarlac':  [15.3283,  120.6604],
  'sm-sto-tomas':       [14.1038,  121.1396],
  'sm-bataan':          [14.6766,  120.5354],
};

interface BranchMapProps {
  regions: Region[];
}

export function BranchMap({ regions }: BranchMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    /* Dynamically import Leaflet CSS */
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return;

      /* Fix default icon path broken by webpack */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      /* Custom yellow pin matching brand */
      const brandIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;
          background:#F2B705;
          border:2.5px solid #1A1A1A;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 6px rgba(26,26,26,0.25);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      const map = L.map(containerRef.current, {
        center: [14.9, 120.9],
        zoom: 8,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      /* Add a marker for every branch that has coords */
      regions.forEach((region) => {
        region.branches.forEach((branch) => {
          const coords = COORDS[branch.id];
          if (!coords) return;

          const popup = `
            <div style="font-family:system-ui,sans-serif;min-width:160px">
              <p style="font-weight:700;font-size:14px;margin:0 0 4px">${branch.name}</p>
              ${branch.address ? `<p style="font-size:12px;color:#5B5B5B;margin:0 0 4px">${branch.address}</p>` : ''}
              ${branch.hours ? `<p style="font-size:12px;color:#5B5B5B;margin:0 0 6px">${branch.hours}</p>` : ''}
              <a href="${branch.facebook}" target="_blank" rel="noopener noreferrer"
                style="display:inline-block;background:#F2B705;color:#1A1A1A;font-size:12px;font-weight:600;padding:4px 10px;border-radius:6px;text-decoration:none">
                Message branch
              </a>
            </div>
          `;

          L.marker(coords, { icon: brandIcon })
            .addTo(map)
            .bindPopup(popup);
        });
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [regions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 'clamp(360px, 55vh, 520px)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface-muted)',
      }}
      aria-label="Map of Hola branches across Luzon"
      role="img"
    />
  );
}
