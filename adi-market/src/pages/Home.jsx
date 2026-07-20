import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import CardPublicacion from "../components/CardPublicacion";
import Footer from "../components/Footer";

import { obtenerPublicaciones } from "../services/api";

// Página principal de ADI Market
function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Obtiene las publicaciones reales del Marketplace
  useEffect(() => {
    async function cargarPublicaciones() {
      try {
        setCargando(true);
        setError("");

        const datos = await obtenerPublicaciones();

        // Dejamos solamente las primeras tres publicaciones
        setPublicaciones(datos.slice(0, 3));
      } catch (errorConsulta) {
        console.error(errorConsulta);

        setError(
          "No fue posible cargar las publicaciones destacadas."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarPublicaciones();
  }, []);

  return (
    <div>
      {/* Menú superior */}
      <Navbar />

      {/* Hero principal */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Encuentra espacio disponible
            <br />
            para transportar tu carga
          </h1>

          <p className="lead mt-3">
            Conecta con transportistas que tienen rutas disponibles
            en todo Chile.
          </p>

          {/* Enlace directo al Marketplace */}
          <Link
            to="/marketplace"
            className="btn btn-primary btn-lg mt-3"
          >
            Ver publicaciones
          </Link>
        </div>
      </section>

      {/* Sección de publicaciones destacadas */}
      <section className="container my-5">
        <div className="text-center">
          <h2 className="fw-bold">
            Publicaciones destacadas
          </h2>

          <p className="text-muted">
            Espacios de transporte disponibles actualmente.
          </p>
        </div>

        {/* Mensaje durante la carga */}
        {cargando && (
          <div className="alert alert-info mt-4">
            Cargando publicaciones destacadas...
          </div>
        )}

        {/* Mensaje de error */}
        {!cargando && error && (
          <div className="alert alert-danger mt-4">
            {error}
          </div>
        )}

        {/* Mensaje si todavía no hay publicaciones */}
        {!cargando &&
          !error &&
          publicaciones.length === 0 && (
            <div className="alert alert-warning mt-4">
              Actualmente no existen publicaciones disponibles.
            </div>
          )}

        {/* Tres publicaciones reales */}
        <div className="row g-4 mt-3">
          {!cargando &&
            !error &&
            publicaciones.map((publicacion) => (
              <div
                className="col-md-4"
                key={publicacion.id_publicacion}
              >
                <CardPublicacion
                  id={publicacion.id_publicacion}
                  origen={publicacion.origen}
                  destino={publicacion.destino}
                  m3={publicacion.m3_disponible}
                  precio={publicacion.precio}
                />
              </div>
            ))}
        </div>

        {/* Acceso adicional al Marketplace */}
        {!cargando && publicaciones.length > 0 && (
          <div className="text-center mt-4">
            <Link
              to="/marketplace"
              className="btn btn-outline-primary"
            >
              Ver todas las publicaciones
            </Link>
          </div>
        )}
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

export default Home;