// Tarjeta de publicación
function CardPublicacion({ origen, destino, m3, precio }) {

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
          Desde <strong>${precio}</strong>
        </p>

        {/* Botón */}
        <button className="btn btn-primary">
          Ver detalle
        </button>

      </div>

    </div>

  );
}

export default CardPublicacion;