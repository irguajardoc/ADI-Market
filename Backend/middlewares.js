import jwt from "jsonwebtoken";

// Middleware para validar token JWT
export function validarToken(req, res, next) {
  try {
    // Leer token desde la cabecera Authorization
    const authHeader = req.headers.authorization;

    // Si no viene token
    if (!authHeader) {
      return res.status(401).json({
        error: "Token no enviado"
      });
    }

   const token = authHeader.split(" ")[1];

    // Si el token no existe
    if (!token) {
      return res.status(401).json({
        error: "Token inválido"
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar datos del usuario en la request
    req.usuario = decoded;

    // Continuar la ruta
    next();

  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado"
    });
  }
}