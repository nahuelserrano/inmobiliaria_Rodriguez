import type { PaginatedPropertiesResponse, PublicPropertyDto } from '@/types/property';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export type PropertyQuery = Record<string, string | number | undefined>;

function queryString(query: PropertyQuery) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.set(key, String(value));
  });
  return params.toString();
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error(`Error de API (${response.status})`);
  return response.json() as Promise<T>;
}

export function fetchProperties(query: PropertyQuery = {}) {
  const params = queryString(query);
  return get<PaginatedPropertiesResponse>(`/properties${params ? `?${params}` : ''}`);
}

export async function fetchPropertyTypes() {
  const data = await get<{ types?: string[] }>('/properties/property-types');
  return data.types ?? [];
}

export function fetchProperty(id: string) {
  return get<PublicPropertyDto>(`/properties/${encodeURIComponent(id)}`);
}
