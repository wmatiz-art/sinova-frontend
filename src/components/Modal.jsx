// Ventana modal reutilizable (fondo oscuro + caja centrada)
function Modal({ titulo, children, ancho = "modal-lg" }) {
  return (
    <>
      <div className="modal d-block" role="dialog" aria-modal="true">
        <div className={`modal-dialog modal-dialog-centered ${ancho}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">{titulo}</h2>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}

export default Modal;
