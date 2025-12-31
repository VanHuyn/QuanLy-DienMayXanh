const { DonHang, ChiNhanh } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

class RevenueService {
  // Tổng doanh thu toàn hệ thống
  static async getTotalRevenue() {
    const total = await DonHang.sum("TongTien", {
      where: { TrangThai: "DaHoanTat" },
    });
    return total || 0;
  }


  static async getBranchRevenue(chiNhanhId) {
    if (!chiNhanhId) return [];

    try {
      const result = await DonHang.findAll({
        attributes: [
          [fn("DATE", col("NgayDat")), "ngay"], // Ngày đặt
          [fn("SUM", col("TongTien")), "doanhThu"], // Tổng tiền
          "ChiNhanhId",
        ],
        where: {
          TrangThai: "DaHoanTat",
          ChiNhanhId: chiNhanhId,
        },
        include: [
          {
            model: ChiNhanh,
            as: "ChiNhanh", // PHẢI TRÙNG VỚI alias trong association
            attributes: ["Ten"],
          },
        ],
        group: ["ChiNhanhId", literal("DATE(NgayDat)")],
        order: [[literal("DATE(NgayDat)"), "ASC"]],
        raw: true,
        nest: true, // để kết quả nested theo alias
      });

      // Chuẩn hóa dữ liệu
      return result.map((r) => ({
        chiNhanhId: r.ChiNhanhId,
        tenChiNhanh: r.ChiNhanh?.Ten || "N/A",
        ngay: r.ngay,
        doanhThu: Number(r.doanhThu) || 0,
      }));
    } catch (error) {
      console.error("Lỗi getBranchRevenue:", error.message);
      return [];
    }
  }

  // Thống kê doanh thu theo ngày (optionally theo chi nhánh)
  static async getRevenueByDate(chiNhanhId = null) {
    const where = { TrangThai: "DaHoanTat" };
    if (chiNhanhId) where.ChiNhanhId = chiNhanhId;

    const result = await DonHang.findAll({
      attributes: [
        [fn("DATE", col("NgayDat")), "Ngay"],
        [fn("SUM", col("TongTien")), "DoanhThu"],
      ],
      where,
      group: [literal("DATE(NgayDat)")],
      order: [[literal("DATE(NgayDat)"), "ASC"]],
    });

    return result.map((r) => r.get({ plain: true }));
  }
  static async getRevenueByDate(chiNhanhId = null) {
    const where = { TrangThai: "DaHoanTat" };
    if (chiNhanhId) where.ChiNhanhId = chiNhanhId;

    // Lấy doanh thu theo ngày
    const result = await DonHang.findAll({
      attributes: [
        [fn("DATE", col("NgayDat")), "Ngay"],
        [fn("SUM", col("TongTien")), "DoanhThu"],
        "ChiNhanhId",
      ],
      where,
      group: ["ChiNhanhId", literal("DATE(NgayDat)")],
      order: [["ChiNhanhId"], [literal("DATE(NgayDat)"), "ASC"]],
      include: [
        {
          model: ChiNhanh,
          attributes: ["Ten"],
        },
      ],
    });

    // Chuẩn hóa data
    return result.map((r) => {
      const plain = r.get({ plain: true });
      return {
        chiNhanhId: plain.ChiNhanhId,
        tenChiNhanh: plain.ChiNhanh?.Ten || "N/A",
        ngay: plain.Ngay,
        doanhThu: Number(plain.DoanhThu) || 0,
      };
    });
  }

  // Doanh thu chi nhánh tất cả chi nhánh
  static async getAllBranchesRevenue() {
    const branches = await ChiNhanh.findAll();
    const data = [];
    for (let branch of branches) {
      const doanhThu = await this.getBranchRevenue(branch.Id);
      data.push({
        chiNhanhId: branch.Id,
        tenChiNhanh: branch.Ten,
        doanhThu,
      });
    }
    return data;
  }
}

module.exports = RevenueService;
