const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/ticketController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/buy', verifyToken, ticketCtrl.buy);
router.get('/me', verifyToken, ticketCtrl.myTickets);

module.exports = router;
