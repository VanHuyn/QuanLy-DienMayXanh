const { where } = require("sequelize");
const {
  DanhGiaSanPham,
  DonHang,
  ChiTietDonHang,
  KhachHang,NguoiDung,
  sequelize,
} = require("../models");

class RatingService {
  // Tạo đánh giá
  static async createRating({ KhachHangId, SanPhamId, SoSao, NoiDung }) {
    // Lấy KhachHang từ NguoiDungId
    const khachHang = await KhachHang.findOne({
      where: { NguoiDungId: KhachHangId },
    });
    if (!khachHang) throw new Error("Khách hàng không tồn tại");

    // Kiểm tra khách hàng đã mua sản phẩm chưa
    const hasBought = await ChiTietDonHang.findOne({
      where: { SanPhamId },
      include: [
        {
          model: DonHang,
          as: "DonHang",
          where: { KhachHangId: khachHang.Id, TrangThai: "DaHoanTat" },
        },
      ],
    });

    if (!hasBought) {
      throw new Error("Chỉ có thể đánh giá sản phẩm đã mua");
    }

    // Kiểm tra xem khách hàng đã đánh giá sản phẩm này chưa
    const existing = await DanhGiaSanPham.findOne({
      where: { KhachHangId: khachHang.Id, SanPhamId },
    });

    if (existing) {
      existing.SoSao = SoSao;
      existing.NoiDung = NoiDung;
      await existing.save();
      return existing;
    }

    // Tạo đánh giá mới
    return await DanhGiaSanPham.create({
      KhachHangId: khachHang.Id,
      SanPhamId,
      SoSao,
      NoiDung,
    });
  }

  static async getRatingsByProduct(SanPhamId) {
  return await DanhGiaSanPham.findAll({
    where: { SanPhamId },
    include: [
      {
        model: KhachHang,
        as: "KhachHang", 
        attributes: ["Id", "NguoiDungId"],
        include: [
          {
            model: NguoiDung,
            as: "NguoiDung", 
            attributes: ["HoTen", "Email", "SoDienThoai"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

}

module.exports = RatingService;
