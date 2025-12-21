// routes/khoTong.router.js
const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse.controller");

// CRUD Kho Tổng
router.post("/", warehouseController.create);
router.get("/", warehouseController.getAll);
router.get("/:id", warehouseController.getById);
router.put("/:id", warehouseController.update);
router.delete("/:id", warehouseController.delete);

module.exports = router;
