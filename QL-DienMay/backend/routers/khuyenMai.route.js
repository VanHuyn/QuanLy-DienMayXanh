const express = require("express");
const router = express.Router();
const KhuyenMaiController = require("../controllers/khuyenMai.controller");

// CRUD routes
router.post("/", KhuyenMaiController.create);
router.get("/code/:code", KhuyenMaiController.checkCode);
router.get("/", KhuyenMaiController.getAll);
router.get("/:id", KhuyenMaiController.getById);
router.put("/:id", KhuyenMaiController.update);
router.delete("/:id", KhuyenMaiController.delete);

module.exports = router;
