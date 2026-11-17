import { useState } from "react";
import Modal from "./Modal.jsx";

// Formulario para registrar y editar empleados (zona 8 del diseno, HU-01 y HU-03)
const VACIO = {
  tipoDocumento: "", numeroDocumento: "", nombres: "", apellidos: "", fechaNacimiento: "",
  telefono: "", correo: "", numeroCuenta: "", direccion: "", estado: true
};
const OBLIGATORIOS = ["tipoDocumento", "numeroDocumento", "nombres", "apellidos"];

function FormularioEmpleado({ empleado, errores, mensajeError, onGuardar, onCancelar }) {
  // Si llega un empleado es edicion; si no, es un registro nuevo
  const [datos, setDatos] = useState(() => {
    if (!empleado) return VACIO;
    const copia = { ...VACIO };
    Object.keys(VACIO).forEach((c) => (copia[c] = empleado[c] ?? VACIO[c]));
    return copia;
  });

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({ ...datos, [name]: type === "checkbox" ? checked : value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Los campos opcionales vacios se envian como null; se conserva el banco del empleado
    const envio = { idBanco: empleado?.idBanco ?? null, estado: datos.estado };
    Object.keys(VACIO).filter((c) => c !== "estado").forEach((c) => {
      const valor = String(datos[c]).trim();
      envio[c] = valor === "" && !OBLIGATORIOS.includes(c) ? null : valor;
    });
    onGuardar(envio);
  };

  // Dibuja un campo con su etiqueta y el error que devuelve la API
  const campo = (nombre, etiqueta, tipo = "text") => (
    <div className="col-md-6">
      <label htmlFor={nombre} className="form-label">
        {etiqueta} {OBLIGATORIOS.includes(nombre) && <b className="obligatorio">*</b>}
      </label>
      <input
        id={nombre} name={nombre} type={tipo}
        className={`form-control campo ${errores[nombre] ? "is-invalid" : ""}`}
        value={datos[nombre]} onChange={manejarCambio}
      />
      <div className="invalid-feedback">{errores[nombre]}</div>
    </div>
  );

  return (
    <Modal titulo={empleado ? `Editar empleado #${empleado.idEmpleado}` : "Registrar empleado"}>
      <form className="row g-3" onSubmit={manejarEnvio} noValidate>
        <div className="col-md-6">
          <label htmlFor="tipoDocumento" className="form-label">
            Tipo de documento <b className="obligatorio">*</b>
          </label>
          <select
            id="tipoDocumento" name="tipoDocumento"
            className={`form-select campo ${errores.tipoDocumento ? "is-invalid" : ""}`}
            value={datos.tipoDocumento} onChange={manejarCambio}
          >
            <option value="">Seleccione...</option>
            <option value="CC">CC - Cédula de ciudadanía</option>
            <option value="CE">CE - Cédula de extranjería</option>
            <option value="TI">TI - Tarjeta de identidad</option>
            <option value="PA">PA - Pasaporte</option>
          </select>
          <div className="invalid-feedback">{errores.tipoDocumento}</div>
        </div>
        {campo("numeroDocumento", "Número de documento")}
        {campo("nombres", "Nombres")}
        {campo("apellidos", "Apellidos")}
        {campo("fechaNacimiento", "Fecha de nacimiento", "date")}
        {campo("telefono", "Teléfono")}
        {campo("correo", "Correo")}
        {campo("numeroCuenta", "Número de cuenta")}
        <div className="col-12">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input id="direccion" name="direccion"
            className={`form-control campo ${errores.direccion ? "is-invalid" : ""}`}
            value={datos.direccion} onChange={manejarCambio} />
          <div className="invalid-feedback">{errores.direccion}</div>
        </div>
        <div className="col-12 form-check ms-2">
          <input id="estado" name="estado" type="checkbox" className="form-check-input"
            checked={datos.estado} onChange={manejarCambio} />
          <label htmlFor="estado" className="form-check-label">Empleado activo</label>
        </div>
        {mensajeError && <div className="col-12 mensaje mensaje-error mb-0">{mensajeError}</div>}
        <div className="col-12 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-sinova-sec" onClick={onCancelar}>Cancelar</button>
          <button type="submit" className="btn btn-sinova">
            <i className="bi bi-save me-1"></i> Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default FormularioEmpleado;
