'use client';

import dynamic from 'next/dynamic';

const MapLibreMap = dynamic(() => import('./MapLibreMap'), { ssr: false });

export default function PropertyMap({
  lat,
  lng,
  height = '320px',
}: {
  lat?: number | null;
  lng?: number | null;
  height?: string;
}) {
  const hasLocation =
    typeof lat === 'number' &&
    Number.isFinite(lat) &&
    typeof lng === 'number' &&
    Number.isFinite(lng);

  if (!hasLocation) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center rounded-xl border border-line bg-mist/60 text-sm text-ink"
      >
        Ubicación no disponible
      </div>
    );
  }

  return (
    <div style={{ height }} className="overflow-hidden rounded-xl border border-line bg-mist/60">
      <MapLibreMap lat={lat} lng={lng} zoom={15} />
    </div>
  );
}
