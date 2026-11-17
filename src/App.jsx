import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import EmpleadosPage from "./pages/EmpleadosPage.jsx";

// Estructura general de SINOVA: barra superior, contenido y pie de pagina
function App() {
  return (
    <div className="app">
      <Navbar seccionActiva="Empleados" />
      <main className="container contenido">
        <EmpleadosPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
