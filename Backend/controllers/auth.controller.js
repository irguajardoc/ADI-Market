import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTRAR
export const register = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: "Nombre, email y password son obligatorios"
      });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const resultado = await pool.query(
      `
      INSERT INTO usuarios (
        nombre,
        email,
        password,
        telefono
      )
      VALUES ($1,$2,$3,$4)
      RETURNING
        id_usuario,
        nombre,
        email,
        telefono,
        fecha_creacion,
        estado
      `,
      [nombre, email, passwordEncriptada, telefono]
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al registrar usuario"
    });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son obligatorios"
      });
    }

    const resultado = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE email = $1
      `,
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        error: "Credenciales inválidas"
      });
    }

    const usuario = resultado.rows[0];

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        error: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        nombre: usuario.nombre
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h"
      }
    );

    res.json({
      mensaje: "Login correcto",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al iniciar sesión"
    });
  }
};


// ENTRA A PERFIL
export const perfil = async (req, res) => {
  try {

    const resultado = await pool.query(
      `
      SELECT
        id_usuario,
        nombre,
        email,
        telefono,
        fecha_creacion,
        estado
      FROM usuarios
      WHERE id_usuario = $1
      `,
      [req.usuario.id_usuario]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Perfil obtenido correctamente",
      usuario: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error al obtener perfil"
    });

  }
};