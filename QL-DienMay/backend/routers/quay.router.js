const express = require("express");
const router = express.Router();
const QuayController = require("../controllers/quay.controller");
const auth = require("../middleware/auth");

// Bán hàng tại quầy (POST)
router.post("/sell", auth, QuayController.sellAtQuay);

module.exports = router;
