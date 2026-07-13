import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmarPassword: ""
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const registrarUsuario = async (evento) => {
    evento.preventDefault();

    try {
      setCargando(true);
      setError("");
      setMensaje("");

      if (formulario.password !== formulario.confirmarPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      const respuesta = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: formulario.nombre,
          email: formulario.email,
          telefono: formulario.telefono,
          password: formulario.password
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "No fue posible registrar el usuario"
        );
      }

      setMensaje("Usuario registrado correctamente.");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (errorRegistro) {
      console.error(errorRegistro);

      setError(
        errorRegistro.message ||
        "Ocurrió un error al registrar el usuario"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm p-4">
              <h1 className="text-center mb-4">
                Crear cuenta
              </h1>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {mensaje && (
                <div className="alert alert-success">
                  {mensaje}
                </div>
              )}

              <form onSubmit={registrarUsuario}>
                <div className="mb-3">
                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Ej: Ignacio Guajardo"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    value={formulario.email}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="telefono"
                    className="form-label"
                  >
                    Teléfono
                  </label>

                  <input
                    id="telefono"
                    name="telefono"
                    type="text"
                    inputMode="numeric"
                    className="form-control"
                    placeholder="Ej: 995685526"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Contraseña
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Crea una contraseña"
                    value={formulario.password}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmarPassword"
                    className="form-label"
                  >
                    Confirmar contraseña
                  </label>

                  <input
                    id="confirmarPassword"
                    name="confirmarPassword"
                    type="password"
                    className="form-control"
                    placeholder="Repite tu contraseña"
                    value={formulario.confirmarPassword}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando
                    ? "Registrando..."
                    : "Crear cuenta"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;