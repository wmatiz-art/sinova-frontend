import Modal from "./Modal.jsx";

// Confirmacion antes de una accion que no se puede deshacer (zona 9 del diseno, HU-04)
function DialogoConfirmacion({ titulo, texto, onConfirmar, onCancelar }) {
  return (
    <Modal titulo={titulo} ancho="">
      <p>{texto}</p>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-sinova-sec" onClick={onCancelar}>Cancelar</button>
        <button className="btn btn-peligro" onClick={onConfirmar}>
          <i className="bi bi-trash me-1"></i> Eliminar
        </button>
      </div>
    </Modal>
  );
}

export default DialogoConfirmacion;
