import type { Metadata } from 'next';
import { Handshake, House, ShieldCheck, User, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'Nosotros' };

const team = [
  {
    name: 'Nombre',
    role: 'Rol',
  },
  {
    name: 'Nombre',
    role: 'Rol',
  },
  {
    name: 'Nombre',
    role: 'Rol',
  },
  {
    name: 'Nombre',
    role: 'Rol',
  },
];

const reasons = [
  { title: 'Experiencia', text: 'Conocemos el mercado y te asesoramos con seguridad.', Icon: Users },
  { title: 'Compromiso', text: 'Nos involucramos para acompañarte de principio a fin.', Icon: ShieldCheck },
  { title: 'Cercanía', text: 'Estamos disponibles para ayudarte cuando lo necesites.', Icon: Handshake },
  { title: 'Transparencia', text: 'Información clara y honesta en todo momento.', Icon: House },
];

export default function AboutPage() {
  return (
    <>
      <div className="container-site pb-16 pt-8">
        <p className="eyebrow flex items-center gap-[0.7rem] after:block after:h-0.5 after:w-14 after:bg-gold">
          Nuestro equipo
        </p>
        <h1 className="mt-4 text-[clamp(2.4rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy max-[800px]:text-[2rem]">
          Estamos para acompañarte
        </h1>
        <p className="mt-6 max-w-[620px] text-[1.08rem] leading-[1.7] text-ink">
          Detrás de cada operación hay personas comprometidas con escucharte, asesorarte y encontrar la mejor opción para vos.
        </p>

        <ul className="mt-12 grid list-none grid-cols-4 gap-x-8 gap-y-10 p-0 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {team.map(({ name, role }) => (
            <li key={name}>
              <div className="aspect-[4/3] rounded-lg border-2 border-dotted border-line bg-mist/40" />
              <h2 className="mt-5 font-serif text-[1.5rem] font-bold leading-tight text-navy">{name}</h2>
              <p className="mt-2 flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-gold">
                <User size={18} strokeWidth={1.8} aria-hidden className="shrink-0" />
                {role}
              </p>
              <span aria-hidden className="mt-3 block h-0.5 w-12 bg-gold" />
            </li>
          ))}
        </ul>
      </div>

      <section aria-label="Por qué elegirnos" className="-mb-8 bg-mist py-16 max-[800px]:py-12">
        <ul className="container-site grid list-none grid-cols-4 gap-0 p-0 max-[1000px]:grid-cols-2 max-[1000px]:gap-y-10 max-[600px]:grid-cols-1">
          {reasons.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="flex flex-col items-center border-l border-line px-8 text-center first:border-l-0 max-[1000px]:border-l-0 max-[1000px]:px-4"
            >
              <Icon size={40} strokeWidth={1.4} aria-hidden className="text-gold" />
              <h3 className="mt-3 text-[1.15rem] font-bold text-navy">{title}</h3>
              <p className="mt-2 text-[0.95rem] leading-[1.6] text-ink">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
