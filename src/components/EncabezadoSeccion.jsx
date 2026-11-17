// Titulo de la seccion con su boton principal (zona 2 del diseno)
function EncabezadoSeccion({ titulo, textoBoton, onAccion }) {
  return (
    <header className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="titulo-seccion">{titulo}</h1>
      <button className="btn btn-sinova" onClick={onAccion}>
        <i className="bi bi-person-plus me-1"></i> {textoBoton}
      </button>
    </header>
  );
}

export default EncabezadoSeccion;
