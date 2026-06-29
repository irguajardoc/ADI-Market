// Importamos el Navbar
import Navbar from '../components/Navbar';

// Página de registro de usuario
function Register() {
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
                Registro
              </h1>

              {/* Campo nombre */}
              <div className="mb-3">
                <label className="form-label">
                  Nombre completo
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                />
              </div>

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

              {/* Campo teléfono */}
              <div className="mb-3">
                <label className="form-label">
                  Teléfono
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 995685526"
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
                  placeholder="Crea una contraseña"
                />
              </div>

              {/* Campo confirmar contraseña */}
              <div className="mb-3">
                <label className="form-label">
                  Confirmar contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Repite tu contraseña"
                />
              </div>

              {/* Botón crear cuenta */}
              <button className="btn btn-info w-100">
                Crear Cuenta
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Register;