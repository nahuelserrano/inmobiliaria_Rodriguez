import Link from 'next/link';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyGrid from '@/components/PropertyGrid';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';

export default async function HomePage() {
  const [data, propertyTypes] = await Promise.all([
    fetchProperties({ page: 1, pageSize: 6 }).catch(() => ({ items: [], pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 } })),
    fetchPropertyTypes().catch(() => []),
  ]);

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">Inmobiliaria desde 1947</p>
            <h1 id="hero-title">Encontrá el lugar<br /><em>donde todo empieza.</em></h1>
            <p className="hero__description">Propiedades con historia, espacios para nuevos comienzos y el acompañamiento de quienes conocen Tandil como nadie.</p>
          </div>
          <div className="hero__search">
            <PropertyFilters propertyTypes={propertyTypes} />
          </div>
        </div>
      </section>
      <section className="site-container home-properties">
        <div className="home-properties__heading">
          <div><p className="eyebrow">Últimos ingresos</p><h2>Encontrá tu próxima propiedad</h2></div>
          <Link href="/propiedades">Ver todas las propiedades</Link>
        </div>
        <PropertyGrid properties={data.items} />
      </section>
      <section id="contacto"><h2>Contacto</h2><p>Próximamente podrás contactarnos desde este espacio.</p></section>
    </div>
  );
}
