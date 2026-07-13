import pool from "../db.js";

// Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT *
      FROM publicaciones
      ORDER BY id_publicacion
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener publicaciones"   
    });
  }
};

// Obtener una publicación por ID
export const obtenerPublicacionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `
      SELECT *
      FROM publicaciones
      WHERE id_publicacion = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Publicación no encontrada"
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al buscar publicación"
    });
  }
};

// Crear publicación
export const crearPublicacion = async (req, res) => {
  try {
    const {
    titulo,
    origen,
    destino,
    fecha_salida,
    hora_salida,
    estimado_llegada,
    m3_disponible,
    precio,
    restricciones,
    descripcion
    } = req.body;

    // El ID viene desde el JWT validado por el middleware.
    const id_usuario = req.usuario.id_usuario;

    if (
      !titulo ||
      !origen ||
      !destino ||
      !fecha_salida ||
      !m3_disponible ||
      !precio
    ) {
        return res.status(400).json({
          error: "Faltan datos obligatorios"
        });
      }

    const resultado = await pool.query(
      `
      INSERT INTO publicaciones (
        titulo,
        origen,
        destino,
        fecha_salida,
        hora_salida,
        estimado_llegada,
        m3_disponible,
        precio,
        restricciones,
        descripcion,
        id_usuario
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
      `,
      [
        titulo,
        origen,
        destino,
        fecha_salida,
        hora_salida,
        estimado_llegada,
        m3_disponible,
        precio,
        restricciones,
        descripcion,
        id_usuario
      ]
    );

    res.status(201).json({
      mensaje: "Publicación creada correctamente",
      publicacion: resultado.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear publicación"
    });
  }
};

// Actualizar publicación
export const actualizarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      titulo,
      origen,
      destino,
      fecha_salida,
      hora_salida,
      estimado_llegada,
      m3_disponible,
      precio,
      restricciones,
      descripcion
    } = req.body;

    const resultado = await pool.query(
      `
      UPDATE publicaciones
      SET
        titulo = $1,
        origen = $2,
        destino = $3,
        fecha_salida = $4,
        hora_salida = $5,
        estimado_llegada = $6,
        m3_disponible = $7,
        precio = $8,
        restricciones = $9,
        descripcion = $10
      WHERE id_publicacion = $11
      RETURNING *
      `,
      [
        titulo,
        origen,
        destino,
        fecha_salida,
        hora_salida,
        estimado_llegada,
        m3_disponible,
        precio,
        restricciones,
        descripcion,
        id
      ]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Publicación no encontrada"
      });
    }

    res.json({
      mensaje: "Publicación actualizada correctamente",
      publicacion: resultado.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar publicación"
    });
  }
};

// Eliminar publicación
export const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `
      DELETE FROM publicaciones
      WHERE id_publicacion = $1
      RETURNING *
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Publicación no encontrada"
      });
    }

    res.json({
      mensaje: "Publicación eliminada correctamente",
      publicacion: resultado.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al eliminar publicación"
    });
  }
};