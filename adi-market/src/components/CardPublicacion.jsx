import { Link } from "react-router-dom";

// Tarjeta de publicación
function CardPublicacion({ id, origen, destino, m3, precio }) {

  return (

    <div className="card shadow-sm h-100">

      <div className="card-body">

        {/* Ruta */}
        <h5 className="card-title">
          {origen} → {destino}
        </h5>

        {/* Espacio disponible */}
        <p className="card-text">
          <strong>{m3} m³</strong> disponibles
        </p>

        {/* Precio */}
        <p className="card-text">
          Desde{" "}
          <strong>
            {new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
              maximumFractionDigits: 0
            }).format(Number(precio))}
          </strong>
        </p>

        {/* Botón */}
        <Link
          to={`/publicacion/${id}`}
          className="btn btn-primary"
        >
          Ver detalle
        </Link>

      </div>

    </div>

  );
}

export default CardPublicacion;