import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { validarToken } from "./middlewares.js";
import publicacionesRoutes from "./routes/publicaciones.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/publicaciones", publicacionesRoutes);
app.use("/api", authRoutes);


//prueba api
const publicaciones = [
  {
    id: 1,
    origen: "Santiago",
    destino: "Temuco",
    m3: 20,
    precio: 45000
  },
  {
    id: 2,
    origen: "Santiago",
    destino: "Valdivia",
    m3: 15,
    precio: 60000
  },
  {
    id: 3,
    origen: "Santiago",
    destino: "Antofagasta",
    m3: 30,
    precio: 90000
  }
];

//prueba API
app.get("/", (req, res) => {
  res.json({
    mensaje: "API ADI Market funcionando correctamente"
  });
});
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    proyecto: "ADI Market",
    version: "1.0"
  });
});

const PORT = process.env.PORT || 3000;

pool.query("SELECT NOW()")
  .then((res) => {
    console.log("PostgreSQL conectado");
    console.log(res.rows[0]);
  })
  .catch((err) => {
    console.error("Error PostgreSQL:", err.message);
  });


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});



export default app;