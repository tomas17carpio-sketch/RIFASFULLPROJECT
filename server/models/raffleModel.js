const db = require('../config/db');

const RaffleModel = {
  listActive: async () => {
    const r = await db.query('SELECT * FROM raffles WHERE active = true ORDER BY created_at DESC');
    return r.rows;
  },

  create: async (title, description, price, image, rules) => {
    const r = await db.query(
      'INSERT INTO raffles (title, description, price, image, rules) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, description, price, image, rules]
    );
    return r.rows[0];
  }
};

module.exports = RaffleModel;
