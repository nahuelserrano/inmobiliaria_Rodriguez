import Link from 'next/link';
import type { PublicPropertyDto } from '@/types/property';

export default function PropertyCard({ property }: { property: PublicPropertyDto }) {
  return (
    <article>
      <h3><Link href={`/propiedades/${property.id}`}>{property.title}</Link></h3>
      <p>{property.propertyType} · {property.operation}</p>
      <p>{property.location.city}{property.location.neighborhood ? ` · ${property.location.neighborhood}` : ''}</p>
      {!property.price.hidden && <p>{property.price.currency} {property.price.amount.toLocaleString('es-AR')}</p>}
    </article>
  );
}
