// routes/nhacungcap.router.js
const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/supplier.controller");

// Lấy danh sách NCC
router.get("/", SupplierController.getAll);

// Lấy NCC theo ID
router.get("/:id", SupplierController.getById);

// Tạo mới NCC
router.post("/", SupplierController.create);

// Cập nhật NCC
router.put("/:id", SupplierController.update);

// Xóa NCC
router.delete("/:id", SupplierController.delete);

module.exports = router;
