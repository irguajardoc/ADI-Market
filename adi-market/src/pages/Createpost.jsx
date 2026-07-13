import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { crearPublicacion } from "../services/api";

function CreatePost() {
  const { usuario, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    titulo: "",
    origen: "",
    destino: "",
    fecha_salida: "",
    hora_salida: "",
    estimado_llegada: "",
    m3_disponible: "",
    precio: "",
    restricciones: "",
    descripcion: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Actualiza el campo correspondiente del formulario.
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  // Envía la publicación al backend.
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const datosPublicacion = {
        ...formulario,
        m3_disponible: Number(formulario.m3_disponible),
        precio: Math.round(Number(formulario.precio))
      };

      await crearPublicacion(datosPublicacion, token);

      setMensaje("Publicación creada correctamente.");

      // Volver al Marketplace para ver el nuevo registro.
      setTimeout(() => {
        navigate("/marketplace");
      }, 1000);
    } catch (errorCreacion) {
      console.error(errorCreacion);

      setError(
        errorCreacion.message ||
        "No fue posible crear la publicación."
      );
    } finally {
      setCargando(false);
    }
  };

  // Protección visual: no permitir acceso sin sesión.
  if (!usuario || !token) {
    return (
      <div>
        <Navbar />

        <main className="container my-5">
          <div className="alert alert-warning">
            Debes iniciar sesión para crear una publicación.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm p-4">
              <h1 className="mb-4 text-center">
                Crear publicación
              </h1>

              <p className="text-muted text-center">
                Publicando como {usuario.nombre}
              </p>

              {mensaje && (
                <div className="alert alert-success">
                  {mensaje}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label
                    htmlFor="titulo"
                    className="form-label"
                  >
                    Título
                  </label>

                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    className="form-control"
                    placeholder="Ej: Viaje Santiago a Concepción"
                    value={formulario.titulo}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="origen"
                      className="form-label"
                    >
                      Origen
                    </label>

                    <input
                      id="origen"
                      name="origen"
                      type="text"
                      className="form-control"
                      placeholder="Ciudad de origen"
                      value={formulario.origen}
                      onChange={manejarCambio}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="destino"
                      className="form-label"
                    >
                      Destino
                    </label>

                    <input
                      id="destino"
                      name="destino"
                      type="text"
                      className="form-control"
                      placeholder="Ciudad de destino"
                      value={formulario.destino}
                      onChange={manejarCambio}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor="fecha_salida"
                      className="form-label"
                    >
                      Fecha de salida
                    </label>

                    <input
                      id="fecha_salida"
                      name="fecha_salida"
                      type="date"
                      className="form-control"
                      value={formulario.fecha_salida}
                      onChange={manejarCambio}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor="hora_salida"
                      className="form-label"
                    >
                      Hora de salida
                    </label>

                    <input
                      id="hora_salida"
                      name="hora_salida"
                      type="time"
                      className="form-control"
                      value={formulario.hora_salida}
                      onChange={manejarCambio}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor="estimado_llegada"
                      className="form-label"
                    >
                      Llegada estimada
                    </label>

                    <input
                      id="estimado_llegada"
                      name="estimado_llegada"
                      type="time"
                      className="form-control"
                      placeholder="Ej: 18:00"
                      value={formulario.estimado_llegada}
                      onChange={manejarCambio}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="m3_disponible"
                      className="form-label"
                    >
                      Metros cúbicos disponibles
                    </label>

                    <input
                      id="m3_disponible"
                      name="m3_disponible"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="form-control"
                      placeholder="Ej: 20"
                      value={formulario.m3_disponible}
                      onChange={manejarCambio}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="precio"
                      className="form-label"
                    >
                      Precio
                    </label>

                    <input
                      id="precio"
                      name="precio"
                      type="text"
                      inputMode="numeric"
                      min="1"
                      className="form-control"
                      placeholder="Ej: 45000"
                      value={formulario.precio}
                      onChange={manejarCambio}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="restricciones"
                    className="form-label"
                  >
                    Restricciones
                  </label>

                  <input
                    id="restricciones"
                    name="restricciones"
                    type="text"
                    className="form-control"
                    placeholder="Ej: No se aceptan productos peligrosos"
                    value={formulario.restricciones}
                    onChange={manejarCambio}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="descripcion"
                    className="form-label"
                  >
                    Descripción
                  </label>

                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                    rows="4"
                    placeholder="Describe el espacio de carga disponible"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando
                    ? "Creando publicación..."
                    : "Crear publicación"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreatePost;