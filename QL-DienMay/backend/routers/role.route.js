const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

// Tạo vai trò mới
router.post("/", roleController.create);

// Lấy tất cả
router.get("/", roleController.getAll);

// Lấy chi tiết
router.get("/:id", roleController.getById);

// Cập nhật
router.put("/:id", roleController.update);

// Xóa
router.delete("/:id", roleController.delete);

module.exports = router;
