const { DonHang, ChiTietDonHang, BienTheSanPham, SanPham, KhachHang, NguoiDung } = require("../models");

class InvoiceService {
  // Lấy danh sách hóa đơn bán hàng (tùy chọn filter theo chi nhánh, ngày, trạng thái)
  static async getInvoices({ ChiNhanhId, fromDate, toDate }) {
    const where = {};
    if (ChiNhanhId) where.ChiNhanhId = ChiNhanhId;
    if (fromDate || toDate) where.NgayDat = {};
    if (fromDate) where.NgayDat["$gte"] = fromDate;
    if (toDate) where.NgayDat["$lte"] = toDate;

    const invoices = await DonHang.findAll({
      where,
      include: [
        {
          model: KhachHang,
          as: "KhachHang",
          include: [
            {
              model: NguoiDung,
              as: "NguoiDung",
              attributes: ["HoTen", "Email", "SoDienThoai"],
            },
          ],
        },
        {
          model: ChiTietDonHang,
          as: "ChiTietDonHangs",
          include: [
            {
              model: BienTheSanPham,
              as: "BienTheSanPham",
              include: [
                { model: SanPham, as: "SanPham" },
              ],
            },
          ],
        },
      ],
      order: [["NgayDat", "DESC"]],
    });

    return invoices;
  }

  // Lấy chi tiết một hóa đơn
  static async getInvoiceById(id) {
    const invoice = await DonHang.findByPk(id, {
      include: [
        {
          model: KhachHang,
          as: "KhachHang",
          include: [
            {
              model: NguoiDung,
              as: "NguoiDung",
              attributes: ["HoTen", "Email", "SoDienThoai"],
            },
          ],
        },
        {
          model: ChiTietDonHang,
          as: "ChiTietDonHangs",
          include: [
            {
              model: BienTheSanPham,
              as: "BienTheSanPham",
              include: [
                { model: SanPham, as: "SanPham" },
              ],
            },
          ],
        },
      ],
    });

    if (!invoice) throw new Error("Hóa đơn không tồn tại");
    return invoice;
  }
}

module.exports = InvoiceService;
