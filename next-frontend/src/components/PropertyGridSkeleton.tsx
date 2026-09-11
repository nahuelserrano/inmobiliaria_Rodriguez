export default function PropertyGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Cargando propiedades">
      {[0, 1, 2, 3, 4, 5].slice(0, count).map((i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-line bg-white" aria-hidden>
          <div className="aspect-[16/10] bg-mist" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-mist" />
            <div className="h-4 w-1/2 rounded bg-mist" />
            <div className="h-5 w-1/3 rounded bg-mist" />
          </div>
        </div>
      ))}
    </div>
  );
}
