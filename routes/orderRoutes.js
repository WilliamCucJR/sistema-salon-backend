const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/orders', orderController.getAllOrders);

module.exports = router;