// Mensaje de respuesta al usuario (zona 4 del diseno)
function Mensaje({ texto, tipo, onCerrar }) {
  if (!texto) return null;
  return (
    <div className={`mensaje ${tipo === "error" ? "mensaje-error" : "mensaje-ok"}`} role="alert">
      <i className={`bi ${tipo === "error" ? "bi-exclamation-triangle" : "bi-check-circle"} me-2`}></i>
      {texto}
      <button type="button" className="btn-close float-end" aria-label="Cerrar" onClick={onCerrar}></button>
    </div>
  );
}

export default Mensaje;
