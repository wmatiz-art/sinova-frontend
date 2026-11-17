import Modal from "./Modal.jsx";

// Perfil completo del empleado (HU-02, pantalla Perfil/detalle del mapa de navegacion)
function DetalleEmpleado({ empleado, onCerrar, onEditar }) {
  const filas = [
    ["ID", empleado.idEmpleado], ["Tipo de documento", empleado.tipoDocumento],
    ["Número de documento", empleado.numeroDocumento], ["Nombres", empleado.nombres],
    ["Apellidos", empleado.apellidos], ["Fecha de nacimiento", empleado.fechaNacimiento],
    ["Teléfono", empleado.telefono], ["Correo", empleado.correo],
    ["Número de cuenta", empleado.numeroCuenta], ["Dirección", empleado.direccion],
    ["Estado", empleado.estado ? "Activo" : "Inactivo"]
  ];

  return (
    <Modal titulo="Perfil del empleado">
      <dl className="row mb-0">
        {filas.map(([etiqueta, valor]) => (
          <div className="col-md-6 d-flex" key={etiqueta}>
            <dt className="w-50">{etiqueta}</dt>
            <dd className="w-50">{valor || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-sinova-sec" onClick={onCerrar}>Cerrar</button>
        <button className="btn btn-sinova" onClick={() => onEditar(empleado)}>
          <i className="bi bi-pencil me-1"></i> Editar
        </button>
      </div>
    </Modal>
  );
}

export default DetalleEmpleado;
