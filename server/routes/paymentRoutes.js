const express = require('express');
const router = express.Router();
const paymentCtrl = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, paymentCtrl.submit);
router.get('/pending', verifyToken, paymentCtrl.listPending);

module.exports = router;
