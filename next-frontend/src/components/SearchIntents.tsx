import Link from 'next/link';
import styles from './SearchIntents.module.css';

const WHATSAPP_SELL_URL =
  'https://wa.me/542494575588?text=Hola%2C%20quiero%20vender%20mi%20propiedad';

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.cardIcon}>
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

function KeyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.cardIcon}>
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

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.cardIcon}>
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

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrowIcon}>
      <path
        d="M4 12h15m-6-7 7 7-7 7"
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
    variant: styles.card,
    external: false,
  },
  {
    href: '/propiedades?operacion=alquiler',
    title: 'Alquilar',
    Icon: KeyIcon,
    variant: styles.card,
    external: false,
  },
  {
    href: WHATSAPP_SELL_URL,
    title: 'Vender mi propiedad',
    Icon: ShieldIcon,
    variant: `${styles.card} ${styles.cardDark}`,
    external: true,
  },
] as const;

export default function SearchIntents() {
  return (
    <section className={styles.section} aria-labelledby="search-intents-title">
      <div className="site-container">
        <p className={styles.eyebrow}>Elegí cómo empezar</p>
        <h2 id="search-intents-title" className={styles.title}>
          ¿Qué estás buscando?
        </h2>
        <ul className={styles.grid}>
          {intents.map(({ href, title, Icon, variant, external }) => (
            <li key={title}>
              <Link
                href={href}
                className={variant}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Icon />
                <span className={styles.cardFooter}>
                  <span>{title}</span>
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
