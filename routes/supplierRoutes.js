const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');

const supplierController = new SupplierController();

router.get('/suppliers', (req, res) => supplierController.getSuppliers(req, res));

module.exports = router;