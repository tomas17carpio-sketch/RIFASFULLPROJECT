// services/ticketService.js
// Lógica de negocio para tickets - Editor: Tomas Galea
const db = require('../config/db');

async function isNumberTaken(raffleId, number) {
  const r = await db.query('SELECT id FROM tickets WHERE raffle_id=$1 AND number=$2', [raffleId, number]);
  return r.rows.length > 0;
}

async function reserveTicket(raffleId, userId, number) {
  // uses db unique constraint to guard race conditions
  const r = await db.query('INSERT INTO tickets (raffle_id, user_id, number, status) VALUES ($1,$2,$3,$4) RETURNING *',
    [raffleId, userId, number, 'pending']);
  return r.rows[0];
}

module.exports = { isNumberTaken, reserveTicket };
