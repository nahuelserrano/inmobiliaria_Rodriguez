export default function PropertyFilters({ propertyTypes }: { propertyTypes: string[] }) {
  return (
    <form action="/propiedades" className="grid grid-cols-[1fr_1fr_auto] gap-[0.65rem] max-[800px]:grid-cols-2 max-[430px]:grid-cols-1">
      <label className="min-w-0">
        <span className="sr-only">Operación</span>
        <select name="operacion" defaultValue="venta" aria-label="Operación" className="h-14 w-full cursor-pointer border border-[#d5dde7] bg-white pl-6 pr-10 text-base text-[#1d3557]">
          <option value="venta">Comprar</option>
          <option value="alquiler">Alquilar</option>
        </select>
      </label>
      <label className="min-w-0">
        <span className="sr-only">Tipo de propiedad</span>
        <select name="tipo" defaultValue="" aria-label="Tipo de propiedad" className="h-14 w-full cursor-pointer border border-[#d5dde7] bg-white pl-6 pr-10 text-base text-[#1d3557]">
          <option value="">Todos los tipos</option>
          {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <button type="submit" className="inline-flex h-14 min-w-[145px] cursor-pointer items-center justify-center gap-[0.7rem] bg-gold text-base font-bold text-[#132f54] transition-colors duration-150 hover:bg-gold-light max-[800px]:col-[1/-1] max-[430px]:col-auto">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.35rem] w-[1.35rem] fill-none stroke-current stroke-2">
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m16 16 4.2 4.2" />
        </svg>
        Buscar
      </button>
    </form>
  );
}
