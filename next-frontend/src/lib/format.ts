import type { PropertyPrice } from '@/types/property';

/**
 * Formatea un precio según moneda. Estilo de la marca:
 *   - ARS: "$ 550.000"
 *   - USD: "USD 120.000"
 * Si el precio está oculto, devuelve "Consultar".
 */
export function formatPrice(price: PropertyPrice): string {
  if (price.hidden) {
    return 'Consultar';
  }
  const number = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(
    price.amount,
  );
  return price.currency === 'USD' ? `USD ${number}` : `$ ${number}`;
}

const OPERATION_LABELS: Record<string, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  sale: 'Venta',
  rent: 'Alquiler',
  renta: 'Alquiler',
};

/** Etiqueta humana de la operación (Venta / Alquiler). */
export function operationLabel(operation: string): string {
  return OPERATION_LABELS[operation.toLowerCase()] ?? operation;
}

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  campo: 'Campo',
  local_comercial: 'Local comercial',
  lote: 'Lote',
  quinta: 'Quinta',
  galpon: 'Galpón',
  cabanas_hoteles_otros: 'Cabañas, hoteles y otros',
  fondo_comercio: 'Fondo de comercio',
  cochera: 'Cochera',
  al_pozo: 'Al pozo',
};

/** Etiqueta humana del tipo de propiedad. Si no se conoce, usa el valor con
 *  cada palabra capitalizada (ej. "local_comercial" → "Local Comercial"). */
export function propertyTypeLabel(propertyType: string): string {
  const key = propertyType.trim().toLowerCase();
  if (PROPERTY_TYPE_LABELS[key]) return PROPERTY_TYPE_LABELS[key];

  return key
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const COORD_REGEX = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;

/** Compone la dirección: barrio, altura y ciudad. Si el "barrio" es en realidad
 *  un par de coordenadas (caso de la API), lo omite para no mostrar ruido. */
export function formatLocation(location: {
  city: string;
  address?: string;
  neighborhood?: string;
}): { primary: string; secondary?: string } {
  const hasCoords = !!location.neighborhood && COORD_REGEX.test(location.neighborhood);
  const parts = [location.address, hasCoords ? undefined : location.neighborhood].filter(
    Boolean,
  ) as string[];

  return {
    primary: parts.length > 0 ? parts.join(', ') : location.city,
    secondary: parts.length > 0 ? location.city : undefined,
  };
}
