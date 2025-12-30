// routes/orderRouter.js
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const auth = require("../middleware/auth");

// Đặt hàng
router.post("/", OrderController.placeOrder);

// Lấy danh sách đơn hàng của khách
router.get("/customer/:khachHangId", OrderController.getCustomerOrders);
router.get("/admin-order", auth,OrderController.getAllOrders); // lấy tất cả đơn hàng
router.get("/admin-order/:id",auth, OrderController.getOrderDetail); // chi tiết đơn
router.patch("/admin-order/:id/status",auth, OrderController.updateOrderStatus); // cập nhật trạng thái
module.exports = router;
