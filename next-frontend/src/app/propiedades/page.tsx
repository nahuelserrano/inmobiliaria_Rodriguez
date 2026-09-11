import type { Metadata } from 'next';
import { Suspense } from 'react';
import PropertyFiltersPanel from '@/components/PropertyFiltersPanel';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyGridSkeleton from '@/components/PropertyGridSkeleton';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';
import type { PropertyQuery } from '@/lib/api/properties';

export const metadata: Metadata = { title: 'Propiedades' };

async function FilteredGrid({ query, preserveParams }: { query: PropertyQuery; preserveParams: URLSearchParams }) {
  const data = await fetchProperties({ ...query, page: query.page ?? 1, pageSize: 12 }).catch(() => ({
    items: [],
    pagination: { page: 1, pageSize: 12, total: 0, totalPages: 0 },
  }));
  return <PropertyGrid properties={data.items} pagination={data.pagination} preserveParams={preserveParams} />;
}

export default async function PropertiesPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));
  const types = await fetchPropertyTypes().catch(() => []);
  const preserveParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key !== 'page' && value !== undefined && value !== '') preserveParams.set(key, value);
  });
  return (
    <div className="container-site grid gap-4">
      <header>
          <p className="eyebrow">Catálogo</p>
          <h1 className="text-4xl font-bold text-navy">Propiedades</h1>
      </header>
      <Suspense>
        <PropertyFiltersPanel
          key={JSON.stringify(query)}
          propertyTypes={types}
          initial={query}
        />
      </Suspense>
      <Suspense fallback={<PropertyGridSkeleton count={6} />} key={JSON.stringify({ ...query, page: query.page ?? 1 })}>
        <FilteredGrid query={query} preserveParams={preserveParams} />
      </Suspense>
    </div>
  );
}
