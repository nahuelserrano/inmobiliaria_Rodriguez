import type { Metadata } from 'next';
import { Handshake, Scale, ShieldCheck, Star, User } from 'lucide-react';

export const metadata: Metadata = { title: 'Nosotros' };

const team = [
  {
    name: 'Nombre Apellido',
    role: 'Rol',
  },
  {
    name: 'Nombre Apellido',
    role: 'Rol',
  },
  {
    name: 'Nombre Apellido',
    role: 'Rol',
  },
  {
    name: 'Nombre Apellido',
    role: 'Rol',
  },
  {
    name: 'Nombre Apellido',
    role: 'Rol',
  },
];

const reasons = [
  { title: 'Trayectoria', text: 'Más de 30 años en el mercado inmobiliario de Tandil.', Icon: Star },
  { title: 'Profesionalismo', text: 'Un equipo capacitado y en constante actualización.', Icon: ShieldCheck },
  { title: 'Asesoramiento jurídico', text: 'Contamos con abogados en el equipo para brindarte seguridad en cada paso.', Icon: Scale },
  { title: 'Compromiso', text: 'Acompañamiento personalizado, de principio a fin.', Icon: Handshake },
];

export default function AboutPage() {
  return (
    <>
      <section aria-label="Nuestro equipo" className="-mt-8 bg-mist py-16 max-[800px]:py-12">
        <div className="mx-auto grid w-[min(1480px,calc(100%-2rem))] items-center gap-12 px-[clamp(1.5rem,5vw,6rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <p className="eyebrow flex items-center gap-[0.7rem] after:block after:h-0.5 after:w-14 after:bg-gold">
              Nuestro equipo
            </p>
            <h1 className="mt-4 text-[clamp(2.6rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy max-[800px]:text-[2.2rem]">
              Estamos para<br />
              <em className="font-serif font-normal italic text-gold">acompañarte</em>
            </h1>
            <p className="mt-6 max-w-[520px] text-[1.08rem] leading-[1.7] text-ink">
              Detrás de cada operación hay personas comprometidas con escucharte, asesorarte y encontrar la mejor opción para vos.
            </p>
          </div>

          <ul className="grid list-none grid-cols-2 gap-x-10 gap-y-7 p-0 max-[600px]:grid-cols-1 max-[600px]:gap-y-6">
            {reasons.map(({ title, text, Icon }) => (
              <li key={title} className="flex flex-col items-start text-left">
                <div className="flex items-center gap-3">
                  <Icon size={34} strokeWidth={1.4} aria-hidden className="shrink-0 text-gold" />
                  <h2 className="text-[1.15rem] font-bold text-navy">{title}</h2>
                </div>
                <p className="mt-1 text-[0.98rem] leading-[1.6] text-ink">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Integrantes" className="mx-auto w-[min(1480px,calc(100%-2rem))] px-[clamp(1rem,3vw,3rem)] py-16 max-[800px]:py-12">
        <ul className="grid list-none grid-cols-5 gap-6 p-0 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-1">
          {team.map(({ name, role }) => (
            <li
              key={name}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-mist text-brand/30">
                <User size={44} strokeWidth={1.2} aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-[1.3rem] font-bold leading-tight text-navy">{name}</h2>
                <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">{role}</p>
                <span aria-hidden className="mt-3 block h-0.5 w-12 bg-gold" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
