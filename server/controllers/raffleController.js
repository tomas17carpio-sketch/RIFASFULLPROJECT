const Raffle = require('../models/raffleModel');

exports.listActive = async (req, res) => {
  try {
    const items = await Raffle.listActive();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error listing raffles' });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, price, image, rules } = req.body;
    const r = await Raffle.create(title, description, price, image, rules);
    res.status(201).json(r);
  } catch (err) {
    res.status(500).json({ message: 'Error creating raffle', error: err.message });
  }
};
