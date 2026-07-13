import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

// Página de inicio de sesión
function Login() {
  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mensajes y carga
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Función login entregada por AuthContext
  const { login } = useContext(AuthContext);

  // Permite redirigir después del login
  const navigate = useNavigate();

  // Envía las credenciales al backend
  const iniciarSesion = async (evento) => {
    evento.preventDefault();

    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "No fue posible iniciar sesión"
        );
      }

      // Guarda usuario y token en AuthContext y localStorage
      login(datos.usuario, datos.token);

      // Redirige al Marketplace
      navigate("/marketplace");
    } catch (errorLogin) {
      console.error(errorLogin);

      setError(
        errorLogin.message || "Ocurrió un error al iniciar sesión"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      {/* Menú superior */}
      <Navbar />

      {/* Contenedor principal */}
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {/* Tarjeta del formulario */}
            <div className="card shadow-sm p-4">
              <h1 className="text-center mb-4">
                Iniciar Sesión
              </h1>

              {/* Mensaje de error */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={iniciarSesion}>
                {/* Campo correo */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(evento) =>
                      setEmail(evento.target.value)
                    }
                    required
                  />
                </div>

                {/* Campo contraseña */}
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Contraseña
                  </label>

                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(evento) =>
                      setPassword(evento.target.value)
                    }
                    required
                  />
                </div>

                {/* Botón ingresar */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando
                    ? "Ingresando..."
                    : "Ingresar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;