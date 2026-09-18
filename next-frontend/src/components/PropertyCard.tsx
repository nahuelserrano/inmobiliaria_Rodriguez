'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BedDouble,
  Bath,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Maximize,
  MapPin,
} from 'lucide-react';
import type { PublicPropertyDto } from '@/types/property';
import { formatPrice, operationLabel, formatLocation, propertyTypeLabel } from '@/lib/format';

export default function PropertyCard({ property, priority = false }: { property: PublicPropertyDto; priority?: boolean }) {
  const images = property.images ?? [];
  const [index, setIndex] = useState(0);
  const cover = images[index];
  const location = formatLocation(property.location ?? { city: '' });
  const hasGarage = (property.features?.garage ?? 0) > 0;
  const title = property.location?.city
    ? property.title.replace(`, ${property.location.city}`, '')
    : property.title;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist/60">
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand/50">
            <MapPin size={44} strokeWidth={1.4} aria-hidden />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/30 p-1.5 text-white opacity-0 transition-opacity duration-200 hover:bg-navy/60 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/30 p-1.5 text-white opacity-0 transition-opacity duration-200 hover:bg-navy/60 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-white">
            {operationLabel(property.operation)}
          </span>
          {property.propertyType && (
            <span className="rounded-lg bg-gold px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-white">
              {propertyTypeLabel(property.propertyType)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl leading-snug text-navy transition-colors group-hover:text-brand">
          {title}
        </h3>

        <div className="mt-2 text-base text-navy/60">
          <p className="flex items-center gap-1.5">
            <MapPin size={17} className="shrink-0 text-brand" aria-hidden />
            <span className="truncate">{location.secondary ?? location.primary}</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {typeof property.features?.bedrooms === 'number' && property.features.bedrooms > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-navy/80">
              <BedDouble size={17} className="text-brand" aria-hidden />
              {property.features.bedrooms}
            </span>
          )}
          {typeof property.features?.bathrooms === 'number' && property.features.bathrooms > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-navy/80">
              <Bath size={17} className="text-brand" aria-hidden />
              {property.features.bathrooms}
            </span>
          )}
          {typeof property.features?.totalSurface === 'number' && property.features.totalSurface > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-navy/80">
              <Maximize size={17} className="text-brand" aria-hidden />
              {property.features.totalSurface} m²
            </span>
          )}
          {hasGarage && (
            <span className="flex items-center gap-1.5 text-sm text-navy/80">
              <CarFront size={17} className="text-brand" aria-hidden />
              Cochera
            </span>
          )}
        </div>

        {property.price && (
          <div className="mt-4 border-t border-line pt-4">
            <p className="text-xl font-semibold text-navy">
              {formatPrice(property.price)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
