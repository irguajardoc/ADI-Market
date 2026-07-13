const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerPublicaciones() {
  const respuesta = await fetch(`${API_URL}/api/publicaciones`);

  if (!respuesta.ok) {
    throw new Error("No fue posible obtener las publicaciones");
  }

  return respuesta.json();
}

export async function crearPublicacion(datosPublicacion, token) {
  const respuesta = await fetch(`${API_URL}/api/publicaciones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(datosPublicacion)
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.error || "No fue posible crear la publicación"
    );
  }

  return datos;
}

export async function obtenerPublicacionPorId(id) {
  const respuesta = await fetch(
    `${API_URL}/api/publicaciones/${id}`
  );

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.error || "No fue posible obtener la publicación"
    );
  }

  return datos;
}