import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'La inmobiliaria' };

export default function AboutPage() {
  return (
    <div className="container-site grid gap-4">
      <h1 className="text-4xl text-navy">La inmobiliaria</h1>
      <p className="text-ink">Este espacio queda preparado para incorporar la presentación de Inmobiliaria Rodríguez.</p>
    </div>
  );
}
