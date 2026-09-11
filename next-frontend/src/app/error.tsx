'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container-site grid gap-4">
      <h1 className="text-4xl text-navy">Ocurrió un error</h1>
      <button onClick={reset} className="btn w-fit bg-navy px-6 py-3 text-white hover:bg-navy-soft">
        Reintentar
      </button>
    </div>
  );
}
