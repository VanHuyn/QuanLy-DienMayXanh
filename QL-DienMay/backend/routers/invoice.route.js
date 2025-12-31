const express = require("express");
const router = express.Router();
const InvoiceController = require("../controllers/invoice.controller");
const auth = require("../middleware/auth"); // middleware xác thực user

// Chỉ cho nhân viên bán hàng
router.use(auth);

// Lấy danh sách hóa đơn
router.get("/", InvoiceController.getInvoices);

// Lấy chi tiết hóa đơn
router.get("/:id", InvoiceController.getInvoiceDetail);

module.exports = router;
