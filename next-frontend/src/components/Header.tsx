'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/#contacto', label: 'Contacto' },
];

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="header-phone-icon">
      <path d="M5.4 3.5 8 2.8c.7-.2 1.4.2 1.7.8l1.2 2.9c.2.5.1 1-.3 1.4L9 9.5a15 15 0 0 0 5.5 5.5l1.6-1.6c.4-.4.9-.5 1.4-.3l2.9 1.2c.6.3 1 1 .8 1.7l-.7 2.6c-.2.7-.8 1.2-1.5 1.2C10.2 19.8 4.2 13.8 4.2 5c0-.7.5-1.3 1.2-1.5Z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="Inmobiliaria Rodríguez, inicio">
          <Image src="/logo.png" alt="Inmobiliaria Emilio F. Rodríguez & Asociados" width={500} height={185} priority />
        </Link>

        <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="site-header__phone" href="tel:+542494575588">
            <PhoneIcon />
            <span>2494 57-5588</span>
          </a>
          <a
            className="site-header__cta"
            href="https://wa.me/542494575588"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Contactanos
          </a>
          <button
            type="button"
            className="site-header__menu-button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
