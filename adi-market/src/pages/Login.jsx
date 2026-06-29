// Importamos el Navbar
import Navbar from '../components/Navbar';

// Página de inicio de sesión
function Login() {
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

              {/* Campo correo */}
              <div className="mb-3">
                <label className="form-label">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              {/* Campo contraseña */}
              <div className="mb-3">
                <label className="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              {/* Botón ingresar */}
              <button className="btn btn-primary w-100">
                Ingresar
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;