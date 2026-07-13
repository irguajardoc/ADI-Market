import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Barra superior de ADI Market
function Navbar() {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid px-3">

        {/* Logo */}
        <div className="text-white">
          <h3 className="mb-0">ADI Market</h3>
          <small>Automated Dispatch Interface</small>
        </div>

        {/* Buscador */}
        <form className="d-flex w-50 me-3">
          <input
            className="form-control"
            type="search"
            placeholder="Buscar ruta o destino..."
          />
        </form>

        {/* Usuario logueado */}
        {usuario && (
          <>
            <span className="text-white me-3">
              Hola, {usuario.nombre}
            </span>

            <button
              className="btn btn-light btn-sm me-3"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </>
        )}

        {/* Menú */}
        <div>

          <Link
            to="/"
            className="text-white text-decoration-none me-3"
          >
            Home
          </Link>

          <Link
            to="/marketplace"
            className="text-white text-decoration-none me-3"
          >
            Marketplace
          </Link>

          {usuario && (
          <Link
            to="/crear-publicacion"
            className="text-white text-decoration-none me-3"
          >
            Publicar
          </Link>
           )}

          {/* Solo mostrar si NO está logueado */}
          {!usuario && (
            <>
              <Link
                to="/login"
                className="text-white text-decoration-none me-3"
              >
                Ingresar
              </Link>

              <Link
                to="/register"
                className="text-white text-decoration-none me-3"
              >
                Registrarse
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;