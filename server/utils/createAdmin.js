const bcrypt = require('bcrypt');
const db = require('../config/db');
const logger = require('./logger');

async function createDefaultAdmin(){
  try{
    const adminUser = process.env.ADMIN_DEFAULT_USER || 'admin';
    const adminPass = process.env.ADMIN_DEFAULT_PASS || 'admin123';
    const res = await db.query('SELECT * FROM users WHERE username=$1', [adminUser]);
    if(res.rows.length === 0){
      const hash = await bcrypt.hash(adminPass, 10);
      await db.query('INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4)', [adminUser, `${adminUser}@example.com`, hash, 'admin']);
      logger.info('Default admin created');
    } else {
      logger.info('Default admin already exists');
    }
  } catch(err){
    logger.error('Error creating default admin', err);
  }
}

module.exports = { createDefaultAdmin };
