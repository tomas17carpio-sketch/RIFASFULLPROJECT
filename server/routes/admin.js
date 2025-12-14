// server/routes/admin.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../index"); // tu SQLite db
const bcrypt = require("bcrypt");

// ==============================
// LOGIN ADMIN
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Usuario y contraseña requeridos" });

    // Opcional: admin hardcodeado (si no tienes tabla admins todavía)
    if (username === "admin" && password === "admin123") {
      const token = jwt.sign({ username }, process.env.ADMIN_JWT_SECRET, {
        expiresIn: "4h",
      });
      return res.json({ token });
    }

    // Buscar admin en base de datos SQLite
    const query = `SELECT * FROM admins WHERE username = ?`;
    db.get(query, [username], async (err, admin) => {
      if (err) return res.status(500).json({ message: "Error interno" });
      if (!admin) return res.status(401).json({ message: "Usuario no encontrado" });

      // Verificar contraseña con bcrypt
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

      // Generar token JWT
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.ADMIN_JWT_SECRET,
        { expiresIn: "4h" }
      );

      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en login" });
  }
});

// ==============================
// EJEMPLO DE RUTA PROTEGIDA
// ==============================
const adminAuth = require("../middleware/adminAuth");

router.get("/check", adminAuth, (req, res) => {
  res.json({
    ok: true,
    admin: req.admin,
    message: "Ruta admin funcionando correctamente",
  });
});

module.exports = router;
