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
import styles from './PropertyCard.module.css';

export default function PropertyCard({ property }: { property: PublicPropertyDto }) {
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
    <Link href={`/propiedades/${property.id}`} className={styles.card}>
      <div className={styles.media}>
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <MapPin size={44} strokeWidth={1.4} aria-hidden />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className={`${styles.navButton} ${styles.navPrev}`}
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Imagen siguiente"
              className={`${styles.navButton} ${styles.navNext}`}
            >
              <ChevronRight size={18} aria-hidden />
            </button>
            <div className={styles.dots}>
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeOperation}`}>
            {operationLabel(property.operation)}
          </span>
          {property.propertyType && (
            <span className={`${styles.badge} ${styles.badgeType}`}>
              {propertyTypeLabel(property.propertyType)}
            </span>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.location}>
          <p className={styles.locationRow}>
            <MapPin size={17} className={styles.locationIcon} aria-hidden />
            <span className={styles.locationText}>{location.secondary ?? location.primary}</span>
          </p>
        </div>

        <div className={styles.features}>
          {typeof property.features?.bedrooms === 'number' && property.features.bedrooms > 0 && (
            <span className={styles.feature}>
              <BedDouble size={17} className={styles.featureIcon} aria-hidden />
              {property.features.bedrooms}
            </span>
          )}
          {typeof property.features?.bathrooms === 'number' && property.features.bathrooms > 0 && (
            <span className={styles.feature}>
              <Bath size={17} className={styles.featureIcon} aria-hidden />
              {property.features.bathrooms}
            </span>
          )}
          {typeof property.features?.totalSurface === 'number' && property.features.totalSurface > 0 && (
            <span className={styles.feature}>
              <Maximize size={17} className={styles.featureIcon} aria-hidden />
              {property.features.totalSurface} m²
            </span>
          )}
          {hasGarage && (
            <span className={styles.feature}>
              <CarFront size={17} className={styles.featureIcon} aria-hidden />
              Cochera
            </span>
          )}
        </div>

        {property.price?.hidden === false && (
          <div className={styles.price}>
            <p>{formatPrice(property.price)}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
