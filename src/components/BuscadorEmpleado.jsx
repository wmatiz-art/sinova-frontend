import { useState } from "react";

// Busqueda por numero de documento (zona 3 del diseno, HU-02)
function BuscadorEmpleado({ onBuscar, onVerTodos }) {
  const [documento, setDocumento] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault(); // evita que el formulario recargue la pagina
    onBuscar(documento.trim());
  };

  const verTodos = () => {
    setDocumento("");
    onVerTodos();
  };

  return (
    <form className="d-flex gap-2 mb-3" onSubmit={manejarEnvio}>
      <input
        type="text"
        className="form-control campo"
        placeholder="Buscar por número de documento"
        aria-label="Número de documento"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />
      <button type="submit" className="btn btn-sinova">
        <i className="bi bi-search me-1"></i> Buscar
      </button>
      <button type="button" className="btn btn-sinova-sec" onClick={verTodos}>
        Ver todos
      </button>
    </form>
  );
}

export default BuscadorEmpleado;
