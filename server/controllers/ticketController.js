const Ticket = require('../models/ticketModel');
const db = require('../config/db');

exports.buy = async (req, res) => {
  try {
    const { raffleId, number } = req.body;
    const userId = req.userId;
    if (!raffleId || number == null) return res.status(400).json({ message: 'Missing fields' });
    try {
      const ticket = await Ticket.reserve(raffleId, userId, number);
      res.status(201).json(ticket);
    } catch (err) {
      // Postgres unique violation code 23505
      if (err.code === '23505') {
        return res.status(400).json({ message: 'Número ya vendido' });
      }
      throw err;
    }
  } catch (err) {
    res.status(500).json({ message: 'Error reservando ticket', error: err.message });
  }
};

exports.myTickets = async (req, res) => {
  try {
    const list = await Ticket.listByUser(req.userId);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets', error: err.message });
  }
};
