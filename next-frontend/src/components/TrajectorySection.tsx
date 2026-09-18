import Link from 'next/link';
import ArrowRightIcon from '@/components/ArrowRightIcon';
import YearsExperience from '@/components/YearsExperience';

export default function TrajectorySection() {
  return (
    <section aria-labelledby="trajectory-title" className="py-16 max-[800px]:py-12">
      <div className="container-site flex items-center gap-[clamp(3rem,6vw,6rem)] max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-10">
        <div className="shrink-0">
          <p className="flex items-center gap-[0.7rem] text-[0.8rem] font-bold uppercase tracking-[0.28em] text-brand before:block before:h-0.5 before:w-9 before:bg-brand">
            Nuestra trayectoria
          </p>
          <div className="mt-8">
            <YearsExperience titleId="trajectory-title" />
          </div>
        </div>

        <div className="border-l border-line pl-[clamp(3rem,6vw,6rem)] max-[800px]:w-full max-[800px]:border-l-0 max-[800px]:border-t max-[800px]:pl-0 max-[800px]:pt-10">
          <p className="max-w-[460px] text-[1.15rem] leading-[1.7] text-ink">
            Más de tres décadas de trayectoria, experiencia y un equipo profesional para acompañarte con confianza y asesoramiento tanto inmobiliario como jurídico.
          </p>
          <Link
            href="/nosotros"
            className="btn mt-8 rounded-full border border-brand px-7 py-3 text-[0.95rem] font-bold text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
          >
            Saber más de nosotros
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
