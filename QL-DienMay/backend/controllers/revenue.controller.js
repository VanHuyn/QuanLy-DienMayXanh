const RevenueService = require("../services/revenue.service");

class RevenueController {
  // GET /api/revenue/admin
  static async getAdminRevenue(req, res) {
    try {
      const total = await RevenueService.getTotalRevenue();
      res.json({ success: true, doanhThu: total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // GET /api/revenue/branch/:id
  static async getBranchRevenue(req, res) {
    try {
      const chiNhanhId = req.params.id;
      const total = await RevenueService.getBranchRevenue(chiNhanhId);
      res.json({ success: true, chiNhanhId, doanhThu: total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // GET /api/revenue/branches
  static async getAllBranchesRevenue(req, res) {
    try {
      const data = await RevenueService.getAllBranchesRevenue();
      res.json({ success: true, data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // GET /api/revenue/daily?branchId=xxx
  static async getDailyRevenue(req, res) {
    try {
      const { branchId } = req.query;
      const data = await RevenueService.getRevenueByDate(branchId || null);
      res.json({ success: true, data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = RevenueController;
