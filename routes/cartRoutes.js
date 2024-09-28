const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/cart/:id', cartController.getCartById);
router.post('/cart', cartController.addToCart);
router.get('/cart/total/:id', cartController.getTotalByCustomerId);

module.exports = router;