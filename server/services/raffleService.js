// services/raffleService.js
// Rifa logic - Editor: Tomas Galea
const db = require('../config/db');

async function createRaffle({ title, description, price, image, rules }) {
  const r = await db.query(
    'INSERT INTO raffles (title, description, price, image, rules) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [title, description, price, image, rules]
  );
  return r.rows[0];
}

module.exports = { createRaffle };
