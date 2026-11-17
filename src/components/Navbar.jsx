// Barra de navegacion de SINOVA (zona 1 del diseno)
const opciones = ["Dashboard", "Empleados", "Novedades", "Liquidación", "Reportes"];

function Navbar({ seccionActiva }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark barra-sinova">
      <div className="container">
        <span className="navbar-brand marca">
          SINOVA <small>Sistema de Liquidación de Nómina</small>
        </span>
        <ul className="navbar-nav ms-auto">
          {opciones.map((opcion) => (
            <li className="nav-item" key={opcion}>
              <a href="#" className={`nav-link ${opcion === seccionActiva ? "active" : ""}`}>
                {opcion}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
