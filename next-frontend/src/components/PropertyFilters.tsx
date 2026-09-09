export default function PropertyFilters({ propertyTypes }: { propertyTypes: string[] }) {
  return (
    <form action="/propiedades" className="grid">
      <label>Operación <select name="operacion" defaultValue=""><option value="">Todas</option><option value="venta">Venta</option><option value="alquiler">Alquiler</option></select></label>
      <label>Tipo <select name="tipo" defaultValue=""><option value="">Todos</option>{propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
      <button type="submit">Buscar</button>
    </form>
  );
}
