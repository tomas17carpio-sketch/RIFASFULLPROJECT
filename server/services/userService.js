// services/userService.js
// simple user helpers - Editor: Tomas Galea
const db = require('../config/db');

async function findById(id) {
  const r = await db.query('SELECT id, username, email, role FROM users WHERE id=$1', [id]);
  return r.rows[0];
}

module.exports = { findById };
