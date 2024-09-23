const express = require('express');
const router = express.Router();
const dateController = require('../controllers/DateController');

router.get('/dates', dateController.getAllDates);
router.get('/dates/:id', dateController.getDateById);
router.post('/dates', dateController.createDate);
router.put('/dates/:id', dateController.updateDate);
router.delete('/dates/:id', dateController.deleteDate);

module.exports = router;