// routes/orderRouter.js
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

// Đặt hàng
router.post("/", OrderController.placeOrder);

// Lấy danh sách đơn hàng của khách
router.get("/customer/:khachHangId", OrderController.getCustomerOrders);

module.exports = router;
