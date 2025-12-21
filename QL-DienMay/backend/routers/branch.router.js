const express = require("express");
const router = express.Router();
const BranchController = require("../controllers/branch.controller");
const auth = require("../middleware/auth"); // nếu muốn bảo vệ

// Danh sách chi nhánh
router.get("/", BranchController.getAll);

// Chi tiết chi nhánh
router.get("/:id", BranchController.getById);

// Tạo chi nhánh
router.post("/", auth, BranchController.create);

// Cập nhật chi nhánh
router.put("/:id", auth, BranchController.update);

// Xoá chi nhánh
router.delete("/:id", auth, BranchController.delete);

module.exports = router;
