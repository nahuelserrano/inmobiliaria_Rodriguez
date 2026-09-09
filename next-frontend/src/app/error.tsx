'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="site-container stack"><h1>Ocurrió un error</h1><button onClick={reset}>Reintentar</button></div>;
}
