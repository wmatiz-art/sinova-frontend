import { useEffect, useState } from "react";
import EncabezadoSeccion from "../components/EncabezadoSeccion.jsx";
import BuscadorEmpleado from "../components/BuscadorEmpleado.jsx";
import Mensaje from "../components/Mensaje.jsx";
import TablaEmpleados from "../components/TablaEmpleados.jsx";
import Paginacion from "../components/Paginacion.jsx";
import FormularioEmpleado from "../components/FormularioEmpleado.jsx";
import DetalleEmpleado from "../components/DetalleEmpleado.jsx";
import DialogoConfirmacion from "../components/DialogoConfirmacion.jsx";
import {
  listarEmpleados, buscarPorDocumento, guardarEmpleado,
  actualizarEmpleado, eliminarEmpleado, mensajeDeError
} from "../services/EmpleadoService.js";

const POR_PAGINA = 5;

// Pantalla de Empleados: guarda el estado y coordina los componentes del CRUD
function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "ok" });
  const [formulario, setFormulario] = useState(null);   // null | { empleado }
  const [errores, setErrores] = useState({});
  const [errorFormulario, setErrorFormulario] = useState("");
  const [detalle, setDetalle] = useState(null);
  const [porEliminar, setPorEliminar] = useState(null);

  // HU-02: cargar el listado al abrir la pantalla
  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const respuesta = await listarEmpleados();
      setEmpleados(respuesta.data);
    } catch (error) {
      setMensaje({ texto: mensajeDeError(error), tipo: "error" });
    }
  };

  const buscar = async (documento) => {
    if (!documento) return cargarEmpleados();
    try {
      const respuesta = await buscarPorDocumento(documento);
      setEmpleados([respuesta.data]);
      setMensaje({ texto: "", tipo: "ok" });
    } catch (error) {
      setEmpleados([]);
      setMensaje({ texto: mensajeDeError(error), tipo: "error" });
    }
    setPagina(1);
  };

  const verTodos = () => {
    setMensaje({ texto: "", tipo: "ok" });
    setPagina(1);
    cargarEmpleados();
  };

  // Abre el formulario vacio (registro) o con los datos del empleado (edicion)
  const abrirFormulario = (empleado = null) => {
    setDetalle(null);
    setErrores({});
    setErrorFormulario("");
    setFormulario({ empleado });
  };

  // HU-01 y HU-03: guardar o actualizar segun corresponda
  const guardar = async (datos) => {
    const empleado = formulario.empleado;
    try {
      const respuesta = empleado
        ? await actualizarEmpleado(empleado.idEmpleado, datos)
        : await guardarEmpleado(datos);
      setFormulario(null);
      await cargarEmpleados();
      setMensaje({
        texto: empleado
          ? `Empleado #${respuesta.data.idEmpleado} actualizado correctamente.`
          : `Empleado registrado correctamente con el ID ${respuesta.data.idEmpleado}.`,
        tipo: "ok"
      });
    } catch (error) {
      // Los errores de validacion de la API se muestran debajo de cada campo
      setErrores(error.response?.data?.errores ?? {});
      setErrorFormulario(mensajeDeError(error));
    }
  };

  // HU-04: eliminar despues de confirmar
  const eliminar = async () => {
    const empleado = porEliminar;
    setPorEliminar(null);
    try {
      const respuesta = await eliminarEmpleado(empleado.idEmpleado);
      await cargarEmpleados();
      setMensaje({ texto: respuesta.data.mensaje, tipo: "ok" });
    } catch (error) {
      setMensaje({ texto: mensajeDeError(error), tipo: "error" });
    }
  };

  // Paginacion: se muestran 5 empleados por pagina
  const totalPaginas = Math.max(1, Math.ceil(empleados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = empleados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  return (
    <section>
      <EncabezadoSeccion titulo="Empleados" textoBoton="Registrar empleado" onAccion={() => abrirFormulario()} />
      <BuscadorEmpleado onBuscar={buscar} onVerTodos={verTodos} />
      <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} onCerrar={() => setMensaje({ texto: "", tipo: "ok" })} />

      <div className="tarjeta">
        <TablaEmpleados
          empleados={visibles}
          onVer={setDetalle}
          onEditar={abrirFormulario}
          onEliminar={setPorEliminar}
        />
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted mt-3">Empleados registrados: {empleados.length}</small>
          <Paginacion pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={setPagina} />
        </div>
      </div>

      {formulario && (
        <FormularioEmpleado
          empleado={formulario.empleado}
          errores={errores}
          mensajeError={errorFormulario}
          onGuardar={guardar}
          onCancelar={() => setFormulario(null)}
        />
      )}
      {detalle && (
        <DetalleEmpleado empleado={detalle} onCerrar={() => setDetalle(null)} onEditar={abrirFormulario} />
      )}
      {porEliminar && (
        <DialogoConfirmacion
          titulo="Eliminar empleado"
          texto={`¿Seguro que desea eliminar a ${porEliminar.nombres} ${porEliminar.apellidos} (ID ${porEliminar.idEmpleado})? Esta acción no se puede deshacer.`}
          onConfirmar={eliminar}
          onCancelar={() => setPorEliminar(null)}
        />
      )}
    </section>
  );
}

export default EmpleadosPage;
