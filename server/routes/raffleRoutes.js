const express = require('express');
const router = express.Router();
const raffleCtrl = require('../controllers/raffleController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/active', raffleCtrl.listActive);
router.post('/', verifyToken, isAdmin, raffleCtrl.create);

module.exports = router;
