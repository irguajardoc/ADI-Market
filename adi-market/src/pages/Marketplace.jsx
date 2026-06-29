import { useState } from "react";
import Navbar from '../components/Navbar';
import CardPublicacion from '../components/CardPublicacion';


// Página Marketplace de ADI Market
function Marketplace() {
  const [origen, setOrigen] = useState("");
  return (
    <div>

      {/* Menú superior */}
      <Navbar />

      {/* Contenido principal */}
      <main className="container my-5">

        {/* Título de la página */}
        <h1 className="fw-bold mb-4">
          Marketplace
        </h1>

        <div className="row">

          {/* Columna de filtros */}
          <aside className="col-md-3 mb-4">

            <div className="card p-3 shadow-sm">

              <h5 className="mb-3">
                Filtros
              </h5>

              <label className="form-label">
                Desde
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
              <p className="mt-2 text-muted">
                 Origen seleccionado: {origen}
              </p>

              <label className="form-label">
                Hasta
              </label>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Destino"
              />

              <label className="form-label">
                Fecha
              </label>

              <input
                type="date"
                className="form-control"
              />

            </div>

          </aside>

          {/* Columna de publicaciones */}
          <section className="col-md-9">

            <div className="row g-4">

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

      </main>

    </div>
  );
}

export default Marketplace;