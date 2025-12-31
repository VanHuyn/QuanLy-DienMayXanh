const express = require("express");
const router = express.Router();
const RevenueController = require("../controllers/revenue.controller");

// Tổng doanh thu admin
router.get("/admin", RevenueController.getAdminRevenue);

// Doanh thu chi nhánh cụ thể
router.get("/branch/:id", RevenueController.getBranchRevenue);

// Doanh thu tất cả chi nhánh
router.get("/branches", RevenueController.getAllBranchesRevenue);

// Doanh thu theo ngày (optionally theo chi nhánh)
router.get("/daily", RevenueController.getDailyRevenue);

module.exports = router;
