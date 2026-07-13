import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { obtenerPublicacionPorId } from "../services/api";

function Detail() {
  const { id } = useParams();

  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarPublicacion() {
      try {
        setCargando(true);
        setError("");

        const datos = await obtenerPublicacionPorId(id);

        console.log("Publicación recibida:", datos);

        // Acepta tanto una respuesta directa como:
        // { publicacion: {...} }
        const publicacionRecibida =
          datos.publicacion ? datos.publicacion : datos;

        setPublicacion(publicacionRecibida);
      } catch (errorConsulta) {
        console.error(
          "Error al cargar publicación:",
          errorConsulta
        );

        setError(
          errorConsulta.message ||
          "No fue posible cargar la publicación"
        );
      } finally {
        setCargando(false);
      }
    }

    cargarPublicacion();
  }, [id]);

  // Mientras consulta la API
  if (cargando) {
    return (
      <div>
        <Navbar />

        <main className="container my-5">
          <div className="alert alert-info">
            Cargando publicación...
          </div>
        </main>
      </div>
    );
  }

  // Si la consulta produjo un error
  if (error) {
    return (
      <div>
        <Navbar />

        <main className="container my-5">
          <div className="alert alert-danger">
            {error}
          </div>

          <Link
            to="/marketplace"
            className="btn btn-secondary"
          >
            Volver al Marketplace
          </Link>
        </main>
      </div>
    );
  }

  // Evita que React intente leer una publicación nula
  if (!publicacion) {
    return (
      <div>
        <Navbar />

        <main className="container my-5">
          <div className="alert alert-warning">
            No se encontró información de la publicación.
          </div>

          <Link
            to="/marketplace"
            className="btn btn-secondary"
          >
            Volver al Marketplace
          </Link>
        </main>
      </div>
    );
  }

  const precioFormateado = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(Number(publicacion.precio || 0));

  const fechaFormateada = publicacion.fecha_salida
    ? new Date(publicacion.fecha_salida).toLocaleDateString(
        "es-CL",
        {
          timeZone: "UTC"
        }
      )
    : "No informada";

  return (
    <div>
      <Navbar />

      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm p-4">
              <h1 className="fw-bold mb-3">
                {publicacion.titulo || "Publicación"}
              </h1>

              <h4 className="mb-4">
                {publicacion.origen} → {publicacion.destino}
              </h4>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Fecha de salida:</strong>
                  <p>{fechaFormateada}</p>
                </div>

                <div className="col-md-6">
                  <strong>Hora de salida:</strong>
                  <p>
                    {publicacion.hora_salida ||
                      "No informada"}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Espacio disponible:</strong>
                  <p>
                    {publicacion.m3_disponible || 0} m³
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Precio:</strong>
                  <p>{precioFormateado}</p>
                </div>
              </div>

              <div className="mb-3">
                <strong>Llegada estimada:</strong>
                <p>
                  {publicacion.estimado_llegada ||
                    "No informada"}
                </p>
              </div>

              <div className="mb-3">
                <strong>Restricciones:</strong>
                <p>
                  {publicacion.restricciones ||
                    "Sin restricciones informadas"}
                </p>
              </div>

              <div className="mb-4">
                <strong>Descripción:</strong>
                <p>
                  {publicacion.descripcion ||
                    "Sin descripción"}
                </p>
              </div>

              <Link
                to="/marketplace"
                className="btn btn-secondary"
              >
                Volver al Marketplace
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;