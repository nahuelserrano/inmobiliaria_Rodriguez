import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const navigation = [
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/sobre-mi', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Image
            src="/footer-logo.png"
            alt="Inmobiliaria Emilio F. Rodríguez & Asociados"
            width={315}
            height={304}
          />
        </div>

        <nav className={styles.column} aria-label="Navegación del pie de página">
          <h2>Navegación</h2>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.column}>
          <h2>Encontranos</h2>
          <address>
            <span>Belgrano 319, Tandil</span>
            <a href="mailto:inmobiliariarodriguez@yahoo.com.ar">inmobiliariarodriguez@yahoo.com.ar</a>
            <a href="tel:+542494575588">2494 57-5588</a>
          </address>
        </div>
      </div>

      <div className={styles.copyrightRow}>
        <div className={styles.partner}>
          <span>Forma parte de</span>
          <a href="https://tandilprop.com.ar" target="_blank" rel="noopener noreferrer" aria-label="TandilProp">
            <Image src="/logo-tandilprop.png" alt="TandilProp" width={888} height={239} />
          </a>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Inmobiliaria Rodríguez. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
