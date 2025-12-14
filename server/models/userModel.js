const db = require('../config/db');

const UserModel = {
  create: async (username, email, hashedPassword, role = 'user') => {
    const r = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, username, email, role',
      [username, email, hashedPassword, role]
    );
    return r.rows[0];
  },

  findByUsername: async (username) => {
    const r = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return r.rows[0];
  },

  findById: async (id) => {
    const r = await db.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
    return r.rows[0];
  }
};

module.exports = UserModel;
