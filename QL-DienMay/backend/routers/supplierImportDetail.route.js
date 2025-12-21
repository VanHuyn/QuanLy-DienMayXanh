const express = require("express");
const router = express.Router();
const controller = require("../controllers/supplierImportDetail.controller");

// lấy chi tiết theo phiếu
router.get("/:phieuNhapId", controller.getByPhieu);

// thêm sản phẩm vào phiếu
router.post("/:phieuNhapId", controller.create);

// xoá sản phẩm khỏi phiếu
router.delete("/detail/:id", controller.remove);

module.exports = router;
