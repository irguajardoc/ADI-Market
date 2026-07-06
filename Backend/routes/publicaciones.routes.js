import express from "express";
import { validarToken } from "../middlewares.js";

import {
  obtenerPublicaciones,
  obtenerPublicacionPorId,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion
} from "../controllers/publicaciones.controller.js";

const router = express.Router();

router.get("/", obtenerPublicaciones);
router.get("/:id", obtenerPublicacionPorId);
router.post("/", validarToken, crearPublicacion);
router.put("/:id", validarToken, actualizarPublicacion);
router.delete("/:id", validarToken, eliminarPublicacion);

export default router;