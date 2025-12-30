// routes/danhmuc.router.js
const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/inventory.controller");
const auth = require("../middleware/auth");
// Danh sách tất cả tồn kho
router.get("/", InventoryController.getAll);
router.get(
  "/my-branch",
  auth,
  InventoryController.getMyBranchInventory
);
router.post("/export-kho-tong",auth,InventoryController.exportKhoTongToChiNhanh);

module.exports = router;
