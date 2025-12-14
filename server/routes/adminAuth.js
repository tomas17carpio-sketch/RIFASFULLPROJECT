// server/routes/adminAuth.js
const express = require('express');
const router = express.Router();

// ejemplo: login admin (temporal)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // TODO: validar con BD, usar bcrypt y JWT
  if (!email || !password) return res.status(400).json({ error: 'Faltan credenciales' });
  // placeholder
  return res.json({ ok: true, message: 'Login simulado. Implementar logic.' });
});

module.exports = router;
