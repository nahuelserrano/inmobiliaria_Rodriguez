import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProperty } from '@/lib/api/properties';
import { formatPrice, operationLabel, propertyTypeLabel } from '@/lib/format';

export const metadata: Metadata = { title: 'Detalle de propiedad' };

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await fetchProperty(params.id).catch(() => null);
  if (!property) notFound();
  return (
    <div className="container-site grid gap-4">
      <h1 className="text-4xl text-navy">{property.title}</h1>
      <p className="text-ink">{property.description}</p>
      <p className="text-navy">
        {propertyTypeLabel(property.propertyType)} · {operationLabel(property.operation)}
      </p>
      <p className="text-navy">{property.location.address ?? property.location.city}</p>
      {!property.price.hidden && (
        <p className="text-2xl font-semibold text-navy">{formatPrice(property.price)}</p>
      )}
    </div>
  );
}
