// server/middleware/adminAuth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "No autorizado: falta encabezado Authorization" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No autorizado: token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.admin = decoded; // Guardamos datos del admin para uso posterior
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
