import Link from 'next/link';
import PropertyGrid from '@/components/PropertyGrid';
import { fetchProperties } from '@/lib/api/properties';

export default async function HomePage() {
  const data = await fetchProperties({ page: 1, pageSize: 6 }).catch(() => ({ items: [], pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 } }));
  return (
    <div className="site-container stack">
      <section><h1>Encontrá tu próxima propiedad</h1><p className="muted">Base inicial del sitio de Inmobiliaria Rodríguez.</p><Link href="/propiedades">Ver propiedades</Link></section>
      <section><h2>Propiedades destacadas</h2><PropertyGrid properties={data.items} /></section>
      <section id="contacto"><h2>Contacto</h2><p>Próximamente podrás contactarnos desde este espacio.</p></section>
    </div>
  );
}
