const express = require("express");
const router = express.Router();
const productVariantController = require("../controllers/productVariant.controller");

// Lấy tất cả biến thể sản phẩm
router.get("/", productVariantController.getAll);

// Lấy 1 biến thể theo ID
router.get("/:id", productVariantController.getById);

module.exports = router;
