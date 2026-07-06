import express from "express";
import { validarToken } from "../middlewares.js";

import {
  register,
  login,
  perfil
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/perfil", validarToken, perfil);

export default router;