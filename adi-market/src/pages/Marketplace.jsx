// Importamos los Hooks necesarios desde React.
// useState guarda información que puede cambiar.
// useEffect ejecuta una acción cuando se carga el componente.
import { useEffect, useState } from "react";

// Componentes reutilizables.
import Navbar from "../components/Navbar";
import CardPublicacion from "../components/CardPublicacion";

// Función encargada de consultar el backend.
import { obtenerPublicaciones } from "../services/api";

// Página Marketplace de ADI Market.
function Marketplace() {
  // Guarda el texto escrito en el filtro de origen.
  const [origen, setOrigen] = useState("");

  // Guarda el texto escrito en el filtro de destino.
  const [destino, setDestino] = useState("");

  // Guarda todas las publicaciones recibidas desde PostgreSQL.
  const [publicaciones, setPublicaciones] = useState([]);

  // Indica si la aplicación todavía está esperando la respuesta del backend.
  const [cargando, setCargando] = useState(true);

  // Guarda un mensaje en caso de que falle la conexión con la API.
  const [error, setError] = useState("");

  /**
   * Este useEffect se ejecuta una vez cuando Marketplace se carga.
   *
   * Consulta el backend, obtiene las publicaciones y las guarda
   * dentro del estado publicaciones.
   */
  useEffect(() => {
    async function cargarPublicaciones() {
      try {
        // Antes de consultar, activamos el estado de carga.
        setCargando(true);

        // Limpiamos posibles errores anteriores.
        setError("");

        // Se llama al servicio que consulta Express.
        const datos = await obtenerPublicaciones();

        // Guardamos en React los registros devueltos por PostgreSQL.
        setPublicaciones(datos);
      } catch (errorConsulta) {
        // Mostramos el error completo en la consola del navegador.
        console.error(
          "Error al consultar publicaciones:",
          errorConsulta
        );

        // Mensaje visible para el usuario.
        setError(
          "No fue posible cargar las publicaciones. Revisa que el backend esté funcionando."
        );
      } finally {
        // La consulta terminó, haya sido correcta o no.
        setCargando(false);
      }
    }

    cargarPublicaciones();
  }, []);

  /**
   * Filtra las publicaciones según lo escrito por el usuario.
   *
   * Si los campos están vacíos, muestra todas las publicaciones.
   */
  const publicacionesFiltradas = publicaciones.filter((publicacion) => {
    const coincideOrigen = publicacion.origen
      .toLowerCase()
      .includes(origen.toLowerCase());

    const coincideDestino = publicacion.destino
      .toLowerCase()
      .includes(destino.toLowerCase());

    return coincideOrigen && coincideDestino;
  });

  return (
    <div>
      {/* Menú superior de la aplicación */}
      <Navbar />

      {/* Contenido principal del Marketplace */}
      <main className="container my-5">
        {/* Título principal */}
        <h1 className="fw-bold mb-4">
          Marketplace
        </h1>

        <div className="row">
          {/* Columna izquierda: filtros */}
          <aside className="col-md-3 mb-4">
            <div className="card p-3 shadow-sm">
              <h5 className="mb-3">
                Filtros
              </h5>

              {/* Filtro por ciudad de origen */}
              <label
                htmlFor="filtroOrigen"
                className="form-label"
              >
                Desde
              </label>

              <input
                id="filtroOrigen"
                type="text"
                className="form-control mb-3"
                placeholder="Origen"
                value={origen}
                onChange={(evento) =>
                  setOrigen(evento.target.value)
                }
              />

              {/* Filtro por ciudad de destino */}
              <label
                htmlFor="filtroDestino"
                className="form-label"
              >
                Hasta
              </label>

              <input
                id="filtroDestino"
                type="text"
                className="form-control mb-3"
                placeholder="Destino"
                value={destino}
                onChange={(evento) =>
                  setDestino(evento.target.value)
                }
              />

              {/* Campo de fecha, por ahora solamente visual */}
              <label
                htmlFor="filtroFecha"
                className="form-label"
              >
                Fecha
              </label>

              <input
                id="filtroFecha"
                type="date"
                className="form-control"
              />
            </div>
          </aside>

          {/* Columna derecha: publicaciones */}
          <section className="col-md-9">
            {/* Mensaje mientras se consulta el backend */}
            {cargando && (
              <div className="alert alert-info">
                Cargando publicaciones...
              </div>
            )}

            {/* Mensaje si ocurre un error */}
            {!cargando && error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {/* Mensaje si la API responde, pero no existen resultados */}
            {!cargando &&
              !error &&
              publicacionesFiltradas.length === 0 && (
                <div className="alert alert-warning">
                  No se encontraron publicaciones con los filtros seleccionados.
                </div>
              )}

            {/* Contenedor Bootstrap para las tarjetas */}
            <div className="row g-4">
              {!cargando &&
                !error &&
                publicacionesFiltradas.map((publicacion) => (
                  <div
                    className="col-md-6 col-lg-4"
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
          </section>
        </div>
      </main>
    </div>
  );
}

export default Marketplace;