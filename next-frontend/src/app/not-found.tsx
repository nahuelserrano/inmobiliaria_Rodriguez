import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-site grid gap-4">
      <h1 className="text-4xl text-navy">No encontramos la página</h1>
      <Link href="/" className="font-bold text-brand">Volver al inicio</Link>
    </div>
  );
}
