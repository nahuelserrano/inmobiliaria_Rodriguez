export default function PropertyFilters({ propertyTypes }: { propertyTypes: string[] }) {
  return (
    <form action="/propiedades" className="property-search">
      <label className="property-search__field">
        <span className="sr-only">Operación</span>
        <select name="operacion" defaultValue="venta" aria-label="Operación">
          <option value="venta">Comprar</option>
          <option value="alquiler">Alquilar</option>
        </select>
      </label>
      <label className="property-search__field">
        <span className="sr-only">Tipo de propiedad</span>
        <select name="tipo" defaultValue="" aria-label="Tipo de propiedad">
          <option value="">Todos los tipos</option>
          {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <button type="submit" className="property-search__button">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m16 16 4.2 4.2" />
        </svg>
        Buscar
      </button>
    </form>
  );
}
