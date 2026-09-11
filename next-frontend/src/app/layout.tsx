import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Inmobiliaria Rodríguez', template: '%s | Inmobiliaria Rodríguez' },
  description: 'Propiedades, asesoramiento y contacto de Inmobiliaria Rodríguez.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-[calc(100vh-130px)] pb-8 pt-[calc(120px+2rem)] max-[800px]:pt-[calc(84px+2rem)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
