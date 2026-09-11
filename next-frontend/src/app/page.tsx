import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyGridSkeleton from '@/components/PropertyGridSkeleton';
import SearchIntents from '@/components/SearchIntents';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';

async function LatestProperties() {
  const data = await fetchProperties({ page: 1, pageSize: 3 }).catch(() => ({
    items: [],
    pagination: { page: 1, pageSize: 3, total: 0, totalPages: 0 },
  }));
  return <PropertyGrid properties={data.items} />;
}

export default async function HomePage() {
  const propertyTypes = await fetchPropertyTypes().catch(() => []);

  return (
    <div className="-my-8 overflow-hidden">
      <section aria-labelledby="hero-title" className="relative min-h-[680px] text-white max-[800px]:min-h-[650px]">
        <Image
          src="/background-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_39_70/78%),rgb(20_44_76/62%))]" />
        <div className="relative mx-auto flex min-h-[680px] w-[min(1120px,calc(100%-2rem))] flex-col justify-between py-28 max-[800px]:min-h-[650px] max-[800px]:py-20 max-[800px]:pb-12 max-[430px]:pt-16">
          <div className="max-w-[920px]">
            <p className="mb-8 flex items-center gap-[0.7rem] text-[0.88rem] font-bold uppercase tracking-[0.3em] text-gold-deep before:block before:h-0.5 before:w-[2.7rem] before:bg-gold-deep max-[430px]:text-[0.68rem] max-[430px]:tracking-[0.2em]">
              Inmobiliaria desde 1947
            </p>
            <h1 id="hero-title" className="text-[clamp(3.5rem,6vw,5.8rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white max-[430px]:text-[clamp(2.75rem,13vw,4rem)]">
              Encontrá el lugar<br /><em className="font-serif font-normal italic text-gold-pale">donde todo empieza.</em>
            </h1>
            <p className="mt-12 max-w-[620px] text-xl leading-[1.7] text-white/85 max-[800px]:mt-8 max-[800px]:text-[1.05rem] max-[430px]:text-base">
              Propiedades con historia, espacios para nuevos comienzos y el acompañamiento de quienes conocen Tandil como nadie.
            </p>
          </div>
          <div className="mt-14 w-[min(1050px,100%)] rounded-[3px] bg-white p-3 shadow-search max-[800px]:mt-10 max-[430px]:p-3">
            <PropertyFilters propertyTypes={propertyTypes} />
          </div>
        </div>
      </section>
      <section className="container-site py-16">
        <div className="mb-6 flex items-end justify-between gap-8 max-[800px]:flex-col max-[800px]:items-start">
          <div>
            <p className="eyebrow">Últimos ingresos</p>
            <h2 className="mt-2 text-[2.3rem] font-bold text-navy">Encontrá tu próxima propiedad</h2>
          </div>
          <Link href="/propiedades" className="text-[1.15rem] font-bold text-brand">Ver todas las propiedades</Link>
        </div>
        <Suspense fallback={<PropertyGridSkeleton count={3} />}>
          <LatestProperties />
        </Suspense>
      </section>
      <SearchIntents />
    </div>
  );
}
