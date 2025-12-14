const Payment = require('../models/paymentModel');

exports.submit = async (req, res) => {
  try {
    const { ticketId, bank, phone, idNumber, amount, proof } = req.body;
    if (!ticketId || !bank || !phone || !idNumber || !amount) return res.status(400).json({ message: 'Missing fields' });
    const payment = await Payment.submit(ticketId, req.userId, bank, phone, idNumber, amount, proof || null);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting payment', error: err.message });
  }
};

exports.listPending = async (req, res) => {
  try {
    const pending = await Payment.listPending();
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Error listing pending payments' });
  }
};
