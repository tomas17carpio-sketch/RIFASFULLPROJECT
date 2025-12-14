const db = require('../config/db');

const PaymentModel = {
  submit: async (ticketId, userId, bank, phone, idNumber, amount, proof) => {
    const r = await db.query(
      `INSERT INTO payments (ticket_id, user_id, bank, phone, id_number, amount, proof, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'pending') RETURNING *`,
      [ticketId, userId, bank, phone, idNumber, amount, proof || null]
    );
    return r.rows[0];
  },

  listPending: async () => {
    const r = await db.query(
      `SELECT p.*, u.username, t.number, r.title
       FROM payments p
       JOIN users u ON u.id = p.user_id
       JOIN tickets t ON t.id = p.ticket_id
       JOIN raffles r ON r.id = t.raffle_id
       WHERE p.status = 'pending' ORDER BY p.created_at ASC`
    );
    return r.rows;
  },

  updateStatus: async (id, status) => {
    const r = await db.query('UPDATE payments SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    return r.rows[0];
  }
};

module.exports = PaymentModel;
