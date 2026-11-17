// Paginacion de la tabla (zona 6 del diseno)
function Paginacion({ pagina, totalPaginas, onCambiar }) {
  return (
    <nav className="d-flex justify-content-center gap-1 mt-3" aria-label="Paginación">
      <button className="btn btn-pagina" onClick={() => onCambiar(1)} disabled={pagina === 1}>«</button>
      <button className="btn btn-pagina" onClick={() => onCambiar(pagina - 1)} disabled={pagina === 1}>‹</button>
      <span className="btn btn-pagina activa">{pagina} de {totalPaginas}</span>
      <button className="btn btn-pagina" onClick={() => onCambiar(pagina + 1)} disabled={pagina === totalPaginas}>›</button>
      <button className="btn btn-pagina" onClick={() => onCambiar(totalPaginas)} disabled={pagina === totalPaginas}>»</button>
    </nav>
  );
}

export default Paginacion;
