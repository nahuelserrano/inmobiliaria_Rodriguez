import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Bath,
  BedDouble,
  Calendar,
  CarFront,
  ChevronLeft,
  MapPin,
  Maximize,
  Phone,
  Sparkles,
} from 'lucide-react';
import Gallery from '@/components/Gallery';
import PropertyMap from '@/components/map/PropertyMap';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { ApiError, fetchProperty } from '@/lib/api/properties';
import {
  formatLocation,
  formatPrice,
  isRent,
  operationLabel,
  propertyTypeLabel,
} from '@/lib/format';
import { PHONE_WA, waLink } from '@/constants/contact';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const property = await fetchProperty(params.id);
    return { title: property.title };
  } catch {
    return { title: 'Propiedad no encontrada' };
  }
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  let property;
  try {
    property = await fetchProperty(params.id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const rent = isRent(property.operation);
  const location = formatLocation(property.location ?? { city: '' });
  const { lat, lng } = property.location?.coordinates ?? {};
  const surface = property.features?.totalSurface ?? property.features?.coveredSurface;
  const citySuffix = property.location?.city ? `, ${property.location.city}` : '';
  const cleanTitle =
    citySuffix && property.title.endsWith(citySuffix)
      ? property.title.slice(0, -citySuffix.length)
      : property.title;

  const details = [
    ...(property.features?.bedrooms
      ? [{ label: 'Dormitorios', value: String(property.features.bedrooms), Icon: BedDouble }]
      : []),
    ...(property.features?.bathrooms
      ? [{ label: 'Baños', value: String(property.features.bathrooms), Icon: Bath }]
      : []),
    ...(surface
      ? [{ label: 'Superficie', value: `${surface} m²`, Icon: Maximize }]
      : []),
    ...(property.features?.garage
      ? [{ label: 'Cocheras', value: String(property.features.garage), Icon: CarFront }]
      : []),
    ...(typeof property.antiquityYears === 'number'
      ? [
          {
            label: 'Antigüedad',
            value: property.antiquityYears === 0 ? 'A estrenar' : `${property.antiquityYears} años`,
            Icon: Calendar,
          },
        ]
      : []),
    ...(property.services && property.services.length > 0
      ? [{ label: 'Servicios', value: property.services.join(', '), Icon: Sparkles }]
      : []),
  ];

  const waMessage = `Hola, me interesa esta propiedad: ${cleanTitle}`;

  return (
    <div className="container-site pb-16">
      <Link
        href="/propiedades"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-navy/70 transition-colors hover:text-brand"
      >
        <ChevronLeft size={16} />
        Volver a propiedades
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm text-navy/70">
            <MapPin size={16} className="shrink-0 text-brand" aria-hidden />
            {location.secondary ?? property.location?.city}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-navy sm:text-4xl">{cleanTitle}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {operationLabel(property.operation)}
            </span>
            <span className="rounded-full bg-mist px-4 py-1 text-xs font-semibold uppercase tracking-wide text-navy/70">
              {propertyTypeLabel(property.propertyType)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <Gallery key={property.id} images={property.images ?? []} title={cleanTitle} priority />
        </div>

        <aside className="flex min-w-0 flex-col rounded-xl border border-line bg-white p-6 shadow-card">
          <dl className="divide-y divide-line">
            <div className="pb-4">
              <dd className="mt-0.5 text-3xl font-bold text-navy sm:text-4xl">
                {property.price?.hidden ? 'Consultar' : formatPrice(property.price)}
              </dd>
              {rent && !property.price?.hidden && (
                <p className="mt-1 text-sm text-navy/70">por mes</p>
              )}
            </div>
            {details.map(({ label, value, Icon }) => (
              <div key={label} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Icon size={20} className="mt-0.5 shrink-0 text-navy" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-xs text-ink/70">{label}</dt>
                  <dd className="mt-0.5 truncate text-sm font-medium text-navy" title={value}>{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-gold-deep hover:shadow-lift"
            >
              <WhatsAppIcon size={18} />
              Consultar por WhatsApp
            </a>
            <a
              href={`tel:+${PHONE_WA}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              <Phone size={18} />
              Llamar
            </a>
          </div>
        </aside>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section className="min-w-0">
          <h2 className="text-2xl font-bold text-navy">Descripción</h2>
          <div className="mt-3 space-y-4 text-[0.975rem] leading-relaxed text-navy/80">
            {property.description.split(/\r?\n/).filter(Boolean).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {property.services && property.services.length > 0 && (
            <div className="mt-8">
              <h3 className="eyebrow">Servicios</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-line bg-mist/60 px-3 py-1.5 text-xs font-medium text-navy/80"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="min-w-0">
          <h2 className="text-2xl font-bold text-navy">Ubicación</h2>
          <div className="mt-3">
            <PropertyMap lat={lat} lng={lng} />
          </div>
        </section>
      </div>
    </div>
  );
}
