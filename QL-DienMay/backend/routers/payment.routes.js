const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment.controller");

router.post("/momo/create", PaymentController.createPayment);
router.post("/momo/callback", PaymentController.callback);

module.exports = router;
