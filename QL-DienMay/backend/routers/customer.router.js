// routes/customerRouter.js
const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/Customer.controller");

// GET /api/customer/check-email?email=...
router.get("/check-email", CustomerController.checkEmail);

module.exports = router;
