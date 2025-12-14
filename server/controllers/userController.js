// Ejemplo: datos del usuario autenticado
exports.getProfile = (req, res) => {
  // req.userId viene establecido por el middleware de autenticación
  res.json({ message: `Perfil del usuario con ID ${req.userId}` });
};