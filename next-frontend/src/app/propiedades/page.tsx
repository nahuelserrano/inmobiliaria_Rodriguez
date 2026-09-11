import type { Metadata } from 'next';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyGrid from '@/components/PropertyGrid';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';

export const metadata: Metadata = { title: 'Propiedades' };

export default async function PropertiesPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));
  const [data, types] = await Promise.all([fetchProperties({ ...query, page: query.page ?? 1, pageSize: 12 }).catch(() => ({ items: [], pagination: { page: 1, pageSize: 12, total: 0, totalPages: 0 } })), fetchPropertyTypes().catch(() => [])]);
  const preserveParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key !== 'page' && value !== undefined && value !== '') preserveParams.set(key, value);
  });
  return (
    <div className="container-site grid gap-4">
      <header>
        <h1 className="text-4xl font-bold text-navy">Propiedades</h1>
        <p className="muted">Listado de propiedades disponibles.</p>
      </header>
      <PropertyFilters propertyTypes={types} />
      <PropertyGrid properties={data.items} pagination={data.pagination} preserveParams={preserveParams} />
    </div>
  );
}
