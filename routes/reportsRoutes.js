const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/ReportsController");

router.get("/reports", reportsController.getReport);

module.exports = router;
