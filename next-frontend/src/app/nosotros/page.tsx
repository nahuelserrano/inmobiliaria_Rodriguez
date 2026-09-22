import type { Metadata } from 'next';
import Image from 'next/image';
import { Handshake, Scale, ShieldCheck, Star, User, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'Nosotros' };

const reasons = [
  { title: 'Experiencia', text: 'Más de 30 años de trayectoria y un profundo conocimiento del mercado inmobiliario de Tandil.', Icon: Star },
  { title: 'Compromiso', text: 'Nos involucramos en cada operación con dedicación, responsabilidad y atención a cada detalle.', Icon: Handshake },
  { title: 'Cercanía', text: 'Escuchamos, entendemos y acompañamos personalmente a cada cliente durante todo el proceso.', Icon: Users },
  { title: 'Transparencia', text: 'Información clara, asesoramiento profesional y honestidad en cada decisión.', Icon: ShieldCheck },
];

const martilleros = ['Emilio F. Rodríguez', 'Araceli M. E. Colombo', 'Francisco O. Rodriguez'];

const abogadas = ['Florencia Mendez', 'Mariana G. Ugarte'];

export default function AboutPage() {
  return (
    <>
      <section
        aria-label="Nuestro equipo"
        className="relative -mt-8 overflow-hidden py-16 text-white max-[800px]:py-12"
      >
        <Image
          src="/nosotros-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_39_70/82%),rgb(20_44_76/68%))]"
        />

        <div className="relative mx-auto grid w-[min(1480px,calc(100%-2rem))] items-center gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-12 px-[clamp(1rem,3vw,3rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)]">
          <div>
            <h1 className="text-[clamp(2.6rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white max-[800px]:text-[2.2rem]">
              Experiencia que acompaña<br />
              <em className="font-serif font-normal italic text-gold">cada decisión</em>
            </h1>
            <p className="mt-6 max-w-[520px] text-[1.08rem] leading-[1.7] text-white/85">
              Desde 1995 construimos relaciones basadas en la confianza, el conocimiento del mercado y una atención cercana y personalizada.
            </p>
          </div>

          <ul className="grid list-none grid-cols-4 gap-x-8 gap-y-8 p-0 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            {reasons.map(({ title, text, Icon }) => (
              <li key={title} className="flex flex-col items-start text-left">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                  <Icon size={28} strokeWidth={1.4} aria-hidden className="text-gold" />
                </span>
                <h2 className="mt-4 text-[1.15rem] font-bold text-white">{title}</h2>
                <p className="mt-1 text-[0.98rem] leading-[1.6] text-white/80">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Integrantes" className="mx-auto w-[min(1480px,calc(100%-2rem))] px-[clamp(1rem,3vw,3rem)] py-16 max-[800px]:py-12">
        <p className="eyebrow flex items-center gap-[0.7rem] after:block after:h-0.5 after:w-14 after:bg-gold">
          Equipo profesional
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-mist p-[clamp(1.5rem,3vw,2.5rem)]">
            <header className="flex items-center gap-4">
              <Users size={38} strokeWidth={1.4} aria-hidden className="shrink-0 text-gold" />
              <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold leading-tight text-navy">
                Martilleros y Corredores Públicos
              </h2>
            </header>
            <span aria-hidden className="mt-3 block h-0.5 w-12 bg-gold" />

            <ul className="mt-6 grid list-none grid-cols-3 gap-4 p-0">
              {martilleros.map((name, index) => (
                <li key={index} className="flex flex-col items-center text-center">
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-white text-brand/30">
                    <User size={40} strokeWidth={1.2} aria-hidden />
                  </div>
                  <p className="mt-3 text-[0.95rem] font-bold text-navy">{name}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-line bg-mist p-[clamp(1.5rem,3vw,2.5rem)]">
            <header className="flex items-center gap-4">
              <Scale size={38} strokeWidth={1.4} aria-hidden className="shrink-0 text-gold" />
              <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold leading-tight text-navy">
                Asesoramiento jurídico integral
              </h2>
            </header>
            <span aria-hidden className="mt-3 block h-0.5 w-12 bg-gold" />

            <ul className="mt-6 flex list-none justify-center gap-4 p-0">
              {abogadas.map((name, index) => (
                <li
                  key={index}
                  className="flex w-[calc((100%-2rem)/3)] flex-col items-center text-center"
                >
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-white text-brand/30">
                    <User size={40} strokeWidth={1.2} aria-hidden />
                  </div>
                  <p className="mt-3 text-[0.95rem] font-bold text-navy">{name}</p>
                  <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">Abogada</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[1.05rem] leading-[1.7] text-ink">
              Acompañamos cada operación con asesoramiento legal profesional, aportando seguridad, claridad y respaldo jurídico durante todo el proceso.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
