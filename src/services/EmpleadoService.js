import axios from "axios";

// URL de la API REST de SINOVA (backend Spring Boot)
const URL = "http://localhost:8080/api/empleados";

// HU-02: listar todos los empleados
export const listarEmpleados = () => axios.get(URL);

// HU-02: consultar un empleado por id
export const buscarEmpleado = (id) => axios.get(`${URL}/${id}`);

// HU-02: consultar por numero de documento
export const buscarPorDocumento = (documento) =>
  axios.get(`${URL}/documento/${encodeURIComponent(documento)}`);

// HU-01: registrar un empleado
export const guardarEmpleado = (empleado) => axios.post(URL, empleado);

// HU-03: actualizar un empleado
export const actualizarEmpleado = (id, empleado) => axios.put(`${URL}/${id}`, empleado);

// HU-04: eliminar un empleado
export const eliminarEmpleado = (id) => axios.delete(`${URL}/${id}`);

// Devuelve el mensaje de error que envia la API, o uno general si no hay conexion
export const mensajeDeError = (error) =>
  error.response?.data?.mensaje ?? "No fue posible conectar con el servidor. Verifique que la API este en ejecucion.";
