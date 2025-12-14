const db = require('../config/db');

const TicketModel = {
  reserve: async (raffleId, userId, number) => {
    const r = await db.query(
      'INSERT INTO tickets (raffle_id, user_id, number, status) VALUES ($1,$2,$3,$4) RETURNING *',
      [raffleId, userId, number, 'pending']
    );
    return r.rows[0];
  },

  listByUser: async (userId) => {
    const r = await db.query(
      'SELECT t.*, r.title FROM tickets t JOIN raffles r ON r.id = t.raffle_id WHERE t.user_id = $1 ORDER BY t.created_at DESC',
      [userId]
    );
    return r.rows;
  }
};

module.exports = TicketModel;
