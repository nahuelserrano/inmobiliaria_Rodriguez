import Link from 'next/link';
import ArrowRightIcon from '@/components/ArrowRightIcon';

const WHATSAPP_SELL_URL =
  'https://wa.me/542494575588?text=Hola%2C%20quiero%20vender%20mi%20propiedad';

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        d="M4 10.5 12 3.5l8 7V20a.5.5 0 0 1-.5.5H4.5A.5.5 0 0 1 4 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.5v-6h5v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <circle
        cx="7.5"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M11.5 12H21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.5 12v3.5M21 12v2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        d="M12 3 5.5 5.8v5.4c0 4.4 2.8 7.6 6.5 9.3 3.7-1.7 6.5-4.9 6.5-9.3V5.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.3 11.6 2 2 3.4-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const intents = [
  {
    href: '/propiedades?operacion=venta',
    title: 'Comprar una propiedad',
    Icon: HomeIcon,
    dark: false,
    external: false,
  },
  {
    href: '/propiedades?operacion=alquiler',
    title: 'Alquilar',
    Icon: KeyIcon,
    dark: false,
    external: false,
  },
  {
    href: WHATSAPP_SELL_URL,
    title: 'Vender mi propiedad',
    Icon: ShieldIcon,
    dark: true,
    external: true,
  },
] as const;

const cardBase =
  'group flex min-h-[190px] flex-col justify-between gap-14 p-6 pt-[1.6rem] transition-all duration-200 hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1 focus-visible:shadow-lift motion-reduce:transition-none motion-reduce:hover:transform-none max-[800px]:min-h-0 max-[800px]:gap-10';

export default function SearchIntents() {
  return (
    <section className="mt-4 bg-mist py-16 pb-20 max-[800px]:py-12" aria-labelledby="search-intents-title">
      <div className="container-site">
        <p className="eyebrow">Elegí cómo empezar</p>
        <h2 id="search-intents-title" className="mt-2.5 text-[2.3rem] font-bold tracking-[-0.01em] text-navy max-[800px]:text-[1.9rem]">
          ¿Qué estás buscando?
        </h2>
        <ul className="mt-8 grid list-none grid-cols-3 gap-4 p-0 max-[800px]:grid-cols-1">
          {intents.map(({ href, title, Icon, dark, external }) => (
            <li key={title}>
              <Link
                href={href}
                className={`${cardBase} ${dark ? 'bg-navy text-white hover:bg-navy-soft' : 'bg-white text-navy'}`}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Icon className="h-10 w-10 text-gold transition-transform duration-200 group-hover:scale-[1.35] motion-reduce:transition-none" />
                <span className="flex items-center justify-between gap-4 text-[1.35rem] font-bold leading-[1.25]">
                  <span>{title}</span>
                  <ArrowRightIcon size={22} className="shrink-0 transition-transform duration-200 motion-reduce:transition-none" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
