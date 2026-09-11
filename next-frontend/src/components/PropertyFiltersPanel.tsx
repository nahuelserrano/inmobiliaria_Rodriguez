'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRightLeft,
  Bath,
  BedDouble,
  Building2,
  CarFront,
  ChevronDown,
  RotateCcw,
  Search,
  Tag,
} from 'lucide-react';
import { propertyTypeLabel } from '@/lib/format';

interface PropertyFiltersPanelProps {
  propertyTypes: string[];
  initial: Record<string, string | undefined>;
}

const COUNT_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3plus', label: '3+' },
];

const selectBoxClass =
  'flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-2';
const captionClass = 'text-xs text-ink';
const selectClass =
  'w-full appearance-none bg-transparent font-semibold text-navy focus:outline-none';

export default function PropertyFiltersPanel({ propertyTypes, initial }: PropertyFiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(false);
  }, [searchParams]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      const text = String(value).trim();
      if (text !== '') params.set(key, text);
    });
    if (params.toString() === searchParams.toString()) return;
    setPending(true);
    const query = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`/propiedades${query}`);
  }

  return (
    <form action="/propiedades" method="get" onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className={selectBoxClass}>
          <ArrowRightLeft size={22} className="shrink-0 text-navy" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className={captionClass}>Operación</span>
            <select name="operacion" defaultValue={initial.operacion ?? ''} className={selectClass}>
              <option value="">Todas</option>
              <option value="venta">Comprar</option>
              <option value="alquiler">Alquilar</option>
            </select>
          </span>
          <ChevronDown size={18} className="shrink-0 text-ink" aria-hidden />
        </label>

        <label className={selectBoxClass}>
          <Building2 size={22} className="shrink-0 text-navy" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className={captionClass}>Tipo de propiedad</span>
            <select name="tipo" defaultValue={initial.tipo ?? ''} className={selectClass}>
              <option value="">Todos los tipos</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{propertyTypeLabel(type)}</option>
              ))}
            </select>
          </span>
          <ChevronDown size={18} className="shrink-0 text-ink" aria-hidden />
        </label>

        <label className={selectBoxClass}>
          <BedDouble size={22} className="shrink-0 text-navy" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className={captionClass}>Dormitorios</span>
            <select name="bedrooms" defaultValue={initial.bedrooms ?? ''} className={selectClass}>
              {COUNT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </span>
          <ChevronDown size={18} className="shrink-0 text-ink" aria-hidden />
        </label>

        <label className={selectBoxClass}>
          <Bath size={22} className="shrink-0 text-navy" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className={captionClass}>Baños</span>
            <select name="bathrooms" defaultValue={initial.bathrooms ?? ''} className={selectClass}>
              {COUNT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </span>
          <ChevronDown size={18} className="shrink-0 text-ink" aria-hidden />
        </label>
      </div>

      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-line bg-white p-1.5" role="radiogroup" aria-label="Moneda">
          {(['ARS', 'USD'] as const).map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="currency"
                value={option}
                defaultChecked={initial.currency === option}
                className="peer sr-only"
              />
              <span className="block rounded-md px-5 py-2 text-sm font-semibold text-ink transition-colors peer-checked:bg-navy peer-checked:text-white">
                {option}
              </span>
            </label>
          ))}
        </div>

        <div className="flex min-w-[240px] flex-1 items-center gap-3 rounded-lg border border-line bg-white px-4 py-2">
          <Tag size={22} className="shrink-0 text-navy" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className={captionClass}>Precio</span>
            <span className="flex items-center gap-2">
              <input
                name="minValue"
                type="number"
                min={0}
                placeholder="Mín."
                defaultValue={initial.minValue ?? ''}
                className="w-full min-w-0 bg-transparent font-semibold text-navy placeholder:font-normal placeholder:text-ink/60 focus:outline-none"
              />
              <span className="shrink-0 text-ink/50">—</span>
              <input
                name="maxValue"
                type="number"
                min={0}
                placeholder="Máx."
                defaultValue={initial.maxValue ?? ''}
                className="w-full min-w-0 bg-transparent font-semibold text-navy placeholder:font-normal placeholder:text-ink/60 focus:outline-none"
              />
            </span>
          </span>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-white px-4 py-2">
          <input
            type="checkbox"
            name="garage"
            value="true"
            defaultChecked={initial.garage === 'true'}
            className="h-5 w-5 shrink-0 accent-brand"
          />
          <CarFront size={22} className="shrink-0 text-navy" aria-hidden />
          <span className="text-sm font-semibold text-navy">Cochera</span>
        </label>

        <a href="/propiedades" className="inline-flex items-center gap-2 self-center px-2 py-2 font-semibold text-brand">
          <RotateCcw size={18} aria-hidden />
          Limpiar filtros
        </a>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-lg bg-gold px-8 font-bold text-[#132f54] transition-colors duration-150 hover:bg-gold-light disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 size={20} aria-hidden className="animate-spin" />
              Buscando…
            </>
          ) : (
            <>
              <Search size={20} aria-hidden />
              Buscar
            </>
          )}
        </button>
      </div>
    </form>
  );
}
