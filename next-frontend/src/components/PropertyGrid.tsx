import type { PublicPropertyDto } from '@/types/property';
import PropertyCard from './PropertyCard';

export default function PropertyGrid({ properties }: { properties: PublicPropertyDto[] }) {
  if (!properties.length) return <p className="muted">No hay propiedades para mostrar.</p>;
  return <div className="grid property-grid">{properties.map((property) => <PropertyCard key={property.id} property={property} />)}</div>;
}
