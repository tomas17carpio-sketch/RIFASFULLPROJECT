// server/config/db.js
// Adaptado para SQLite (Editor: Tomas Galea)

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'database.sqlite');

// ensure file exists (will be created when db opens)
if (!fs.existsSync(DB_PATH)) {
  fs.closeSync(fs.openSync(DB_PATH, 'w'));
}

const db = new sqlite3.Database(DB_PATH);

// helper: run (for INSERT/UPDATE/DELETE)
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

// helper: all (for SELECT that returns many rows)
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// helper: get (for SELECT single row)
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

/**
 * query(sql, params)
 * - Imitamos la API de pg Pool: return { rows: [...] }
 * - Para INSERT se devuelve la fila insertada (asumiendo PK 'id').
 */
async function query(sql, params = []) {
  const t = sql.trim().toUpperCase();
  if (t.startsWith('SELECT')) {
    const rows = await all(sql, params);
    return { rows };
  }
  if (t.startsWith('INSERT')) {
    // run then try to return inserted row (assume primary key is "id")
    const res = await run(sql, params);
    const lastID = res.lastID;
    // try to extract table name from "INSERT INTO <table>"
    const m = sql.match(/INSERT\s+INTO\s+["`]?([a-zA-Z0-9_]+)["`]?/i);
    if (m && m[1]) {
      const table = m[1];
      const row = await get(`SELECT * FROM ${table} WHERE id = ?`, [lastID]);
      return { rows: row ? [row] : [] };
    }
    return { rows: [] };
  }
  // For UPDATE/DELETE/DDL
  if (t.startsWith('UPDATE') || t.startsWith('DELETE') || t.startsWith('CREATE') || t.startsWith('ALTER') || t.startsWith('PRAGMA')) {
    const res = await run(sql, params);
    return { rows: [], info: res };
  }

  // Fallback: attempt run()
  try {
    const res = await run(sql, params);
    return { rows: [], info: res };
  } catch (err) {
    throw err;
  }
}

async function initialize() {
  // Enable foreign keys
  await run('PRAGMA foreign_keys = ON;');

  // Create tables (SQLite types and constraints)
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS raffles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL,
      image TEXT,
      rules TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      raffle_id INTEGER,
      user_id INTEGER,
      number INTEGER,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (raffle_id, number),
      FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id INTEGER,
      user_id INTEGER,
      bank TEXT,
      phone TEXT,
      id_number TEXT,
      amount REAL,
      proof TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);
}

module.exports = { query, initialize, db, get, all, run };
