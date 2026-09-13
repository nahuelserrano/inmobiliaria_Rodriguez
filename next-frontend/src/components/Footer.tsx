import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="mx-auto flex min-h-[200px] w-[min(1120px,calc(100%-2rem))] items-center justify-evenly gap-0 py-7 max-[700px]:min-h-0 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-11 max-[700px]:py-6">
        <div className="flex w-[min(24%,240px)] flex-col items-start text-left max-[700px]:hidden">
          <Image
            src="/footer-logo.png"
            alt="Inmobiliaria Emilio F. Rodríguez & Asociados"
            width={315}
            height={304}
            className="block h-auto w-full"
          />
        </div>

        <nav className="flex w-[min(24%,220px)] flex-col items-start text-left max-[700px]:w-[min(100%,300px)]" aria-label="Navegación del pie de página">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.16em] text-gold">Navegación</h2>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-[1.05rem] leading-[1.65] text-footer-text transition-colors duration-150 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex w-[min(24%,220px)] flex-col items-start text-left max-[700px]:w-[min(100%,300px)]">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.16em] text-gold">Encontranos</h2>
          <address className="flex flex-col items-start not-italic">
            <span className="text-[1.05rem] leading-[1.65] text-footer-text">Belgrano 319, Tandil</span>
            <a href="mailto:inmobiliariarodriguez@yahoo.com.ar" className="text-[1.05rem] leading-[1.65] text-footer-text transition-colors duration-150 hover:text-white">
              inmobiliariarodriguez@yahoo.com.ar
            </a>
            <a href="tel:+542494575588" className="text-[1.05rem] leading-[1.65] text-footer-text transition-colors duration-150 hover:text-white">
              2494 57-5588
            </a>
          </address>
        </div>
      </div>

      <div className="relative border-t border-footer-text/80">
        <div className="absolute inset-x-0 bottom-full mb-3 flex items-center justify-end gap-3 pr-4">
          <span className="text-lg text-footer-muted max-[1023px]:hidden">Forma parte de</span>
          <a href="https://tandilprop.com.ar" target="_blank" rel="noopener noreferrer" aria-label="TandilProp">
            <Image src="/logo-tandilprop.png" alt="TandilProp" width={888} height={239} className="block h-10 w-auto lg:h-12" />
          </a>
        </div>
        <div className="flex min-h-16 items-center justify-center px-4 py-5 text-center text-base text-footer-muted">
          © {new Date().getFullYear()} Inmobiliaria Rodríguez. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
