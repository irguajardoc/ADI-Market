// Importamos el Navbar
import Navbar from '../components/Navbar';
import CardPublicacion from '../components/CardPublicacion';

// Página principal de ADI Market
function Home() {
  return (
    <div>

      {/* Menú superior */}
      <Navbar />

      {/* Hero principal */}
      <section className="bg-light text-center py-5">

        {/* Título grande del hero */}
        <h1 className="display-4 fw-bold">
          Encuentra espacio disponible
          <br />
          para transportar tu carga
        </h1>

        {/* Texto descriptivo */}
        <p className="lead mt-3">
          Conecta con transportistas que tienen rutas disponibles en todo Chile.
        </p>

        {/* Botón principal */}
        <button className="btn btn-primary btn-lg mt-3">
          Ver Publicaciones
        </button>

      </section>
      {/* Sección de publicaciones destacadas */}
      
      <section className="container my-5">

        <div className="text-center">

         <h2 className="fw-bold">
             Publicaciones Destacadas
            </h2>

            <p className="text-muted">
         Espacios de transporte disponibles actualmente.
            </p>

        </div>
        {/* Tarjetas */}
        <div className="row g-4 mt-3">

            <div className="col-md-4">

            <CardPublicacion
                origen="Santiago"
                destino="Temuco"
                m3="20"
                precio="45000"
            />

            </div>

            <div className="col-md-4">

            <CardPublicacion
                origen="Santiago"
                destino="Valdivia"
                m3="15"
                precio="60000"
            />

            </div>

            <div className="col-md-4">

            <CardPublicacion
                origen="Santiago"
                destino="Antofagasta"
                m3="30"
                precio="90000"
            />

            </div>

        </div>


        </section>

    </div>
  );
}

export default Home;