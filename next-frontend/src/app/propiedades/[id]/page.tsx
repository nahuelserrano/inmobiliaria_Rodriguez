import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProperty } from '@/lib/api/properties';

export const metadata: Metadata = { title: 'Detalle de propiedad' };

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await fetchProperty(params.id).catch(() => null);
  if (!property) notFound();
  return <div className="site-container stack"><h1>{property.title}</h1><p>{property.description}</p><p>{property.propertyType} · {property.operation}</p><p>{property.location.address ?? property.location.city}</p></div>;
}
