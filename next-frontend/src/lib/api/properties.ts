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

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function get<T>(path: string, revalidate = 60): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new ApiError(`Error de API (${response.status})`, response.status);
  return response.json() as Promise<T>;
}

export function fetchProperties(query: PropertyQuery = {}) {
  const params = queryString(query);
  return get<PaginatedPropertiesResponse>(`/properties${params ? `?${params}` : ''}`);
}

export async function fetchPropertyTypes() {
  const data = await get<{ types?: string[] }>('/properties/property-types', 3600);
  return data.types ?? [];
}

export function fetchProperty(id: string) {
  return get<PublicPropertyDto>(`/properties/${encodeURIComponent(id)}`);
}
