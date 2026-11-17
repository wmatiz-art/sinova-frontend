// Tabla de empleados con acciones por fila (zona 5 del diseno, HU-02)
function TablaEmpleados({ empleados, onVer, onEditar, onEliminar }) {
  return (
    <div className="table-responsive">
      <table className="table tabla-sinova align-middle mb-0">
        <thead>
          <tr>
            <th>ID</th><th>Tipo</th><th>Documento</th><th>Nombre completo</th>
            <th>Teléfono</th><th>Correo</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length === 0 && (
            <tr><td colSpan="8" className="text-center py-4">No hay empleados para mostrar</td></tr>
          )}
          {empleados.map((e) => (
            <tr key={e.idEmpleado}>
              <td>{e.idEmpleado}</td>
              <td>{e.tipoDocumento}</td>
              <td>{e.numeroDocumento}</td>
              <td>{e.nombres} {e.apellidos}</td>
              <td>{e.telefono}</td>
              <td>{e.correo}</td>
              <td><span className="estado">{e.estado ? "Activo" : "Inactivo"}</span></td>
              <td className="text-nowrap">
                <button className="btn btn-accion" title="Ver" onClick={() => onVer(e)}>
                  <i className="bi bi-eye"></i> Ver
                </button>
                <button className="btn btn-accion" title="Editar" onClick={() => onEditar(e)}>
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button className="btn btn-accion eliminar" title="Eliminar" onClick={() => onEliminar(e)}>
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEmpleados;
