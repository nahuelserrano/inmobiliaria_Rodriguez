import Link from 'next/link';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyGrid from '@/components/PropertyGrid';
import SearchIntents from '@/components/SearchIntents';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';
import styles from './page.module.css';

export default async function HomePage() {
  const [data, propertyTypes] = await Promise.all([
    fetchProperties({ page: 1, pageSize: 3 }).catch(() => ({ items: [], pagination: { page: 1, pageSize: 3, total: 0, totalPages: 0 } })),
    fetchPropertyTypes().catch(() => []),
  ]);

  return (
    <div className={styles.homePage}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Inmobiliaria desde 1947</p>
            <h1 id="hero-title">Encontrá el lugar<br /><em>donde todo empieza.</em></h1>
            <p className={styles.description}>Propiedades con historia, espacios para nuevos comienzos y el acompañamiento de quienes conocen Tandil como nadie.</p>
          </div>
          <div className={styles.search}>
            <PropertyFilters propertyTypes={propertyTypes} />
          </div>
        </div>
      </section>
      <section className={`site-container ${styles.properties}`}>
        <div className={styles.propertiesHeading}>
          <div><p className={styles.eyebrow}>Últimos ingresos</p><h2>Encontrá tu próxima propiedad</h2></div>
          <Link href="/propiedades">Ver todas las propiedades</Link>
        </div>
        <PropertyGrid properties={data.items} />
      </section>
      <SearchIntents />
    </div>
  );
}
