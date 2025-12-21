// routes/danhmuc.router.js
const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/inventory.controller");

// Danh sách tất cả tồn kho
router.get("/", InventoryController.getAll);


module.exports = router;
