'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M5.4 3.5 8 2.8c.7-.2 1.4.2 1.7.8l1.2 2.9c.2.5.1 1-.3 1.4L9 9.5a15 15 0 0 0 5.5 5.5l1.6-1.6c.4-.4.9-.5 1.4-.3l2.9 1.2c.6.3 1 1 .8 1.7l-.7 2.6c-.2.7-.8 1.2-1.5 1.2C10.2 19.8 4.2 13.8 4.2 5c0-.7.5-1.3 1.2-1.5Z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-white">
      <div className="mx-auto flex min-h-[120px] w-[min(1600px,calc(100%-3rem))] items-center justify-between gap-8 max-[1100px]:w-[min(100%-2rem,960px)] max-[800px]:min-h-[84px] max-[430px]:w-[calc(100%-1.5rem)] max-[430px]:gap-2">
        <Link href="/" className="block w-[325px] flex-none max-[1100px]:w-[275px] max-[800px]:w-[245px] max-[430px]:w-[205px]" aria-label="Inmobiliaria Rodríguez, inicio">
          <Image src="/logo.webp" alt="Inmobiliaria Emilio F. Rodríguez & Asociados" width={500} height={185} priority className="block h-auto w-full" />
        </Link>

        <nav
          aria-label="Navegación principal"
          className={`ml-auto mr-[clamp(2rem,4vw,5rem)] flex items-center gap-[clamp(1.75rem,2.7vw,3rem)] max-[1100px]:mr-8 max-[1100px]:gap-5 max-[800px]:absolute max-[800px]:inset-x-0 max-[800px]:top-[84px] max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:gap-0 max-[800px]:overflow-hidden max-[800px]:border-t max-[800px]:border-line max-[800px]:bg-white max-[800px]:shadow-[0_5px_10px_rgb(23_43_69/10%)] max-[800px]:transition-all max-[800px]:duration-300 ${
            menuOpen
              ? 'max-[800px]:visible max-[800px]:max-h-80 max-[800px]:translate-y-0 max-[800px]:px-4 max-[800px]:pb-4 max-[800px]:pt-3 max-[800px]:opacity-100'
              : 'max-[800px]:invisible max-[800px]:max-h-0 max-[800px]:-translate-y-2 max-[800px]:p-0 max-[800px]:opacity-0'
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="whitespace-nowrap text-[1.08rem] font-semibold text-navy transition-colors duration-150 hover:text-brand max-[800px]:py-[0.85rem]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-7 max-[1100px]:gap-4">
          <a href="tel:+542494575588" className="inline-flex items-center gap-[0.7rem] whitespace-nowrap text-base font-semibold text-brand transition-colors duration-150 hover:text-navy max-[800px]:hidden">
            <PhoneIcon className="h-[1.35rem] w-[1.35rem]" />
            <span className="max-[1100px]:hidden">2494 57-5588</span>
          </a>
          <a
            href="https://wa.me/542494575588"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="inline-flex min-h-[52px] items-center justify-center whitespace-nowrap rounded-[5px] bg-brand-dark px-8 text-base font-semibold text-white shadow-[0_2px_5px_rgb(23_43_69/18%)] transition-all duration-150 hover:-translate-y-px hover:bg-brand-deep max-[800px]:min-h-[44px] max-[800px]:px-4 max-[800px]:text-sm max-[430px]:hidden"
          >
            Contactanos
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="hidden h-11 w-11 cursor-pointer bg-transparent p-2.5 max-[800px]:block"
          >
            <span className={`my-[5px] block h-0.5 bg-navy transition-all duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`my-[5px] block h-0.5 bg-navy transition-opacity duration-150 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`my-[5px] block h-0.5 bg-navy transition-all duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
