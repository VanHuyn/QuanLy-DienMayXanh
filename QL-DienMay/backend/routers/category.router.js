// routes/danhmuc.router.js
const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");

// Danh sách tất cả danh mục
router.get("/", CategoryController.getAll);
// Lấy 1 danh mục theo ID
router.get("/:id", CategoryController.getById);
// Tạo danh mục mới
router.post("/", CategoryController.create);
// Cập nhật danh mục
router.put("/:id", CategoryController.update);
// Xóa danh mục
router.delete("/:id", CategoryController.delete);

module.exports = router;
