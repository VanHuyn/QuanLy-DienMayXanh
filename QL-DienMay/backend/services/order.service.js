const {
  DonHang,
  ChiTietDonHang,
  BienTheSanPham,
  KhachHang,
  SanPham,
  TonKho,
  AnhSanPham,
  KhoChiNhanh,
} = require("../models");

class OrderService {
  static async createOrder({
    KhachHangId,
    items,
    TinhThanh,
    QuanHuyen,
    XaPhuong,
    DiaChiChiTiet,
    MoTa,
    PhuongThucThanhToan,
    TongTien,
    ChiNhanhId, // đây là id của ChiNhanh
  }) {
    if (!items || !items.length) throw new Error("Danh sách sản phẩm trống");
    if (!ChiNhanhId) throw new Error("Chi nhánh chưa được chọn");

    // Tìm kho chi nhánh tương ứng
    const khoChiNhanh = await KhoChiNhanh.findOne({ where: { ChiNhanhId } });
    if (!khoChiNhanh) throw new Error("Chi nhánh chưa có kho");

    const KhoChiNhanhId = khoChiNhanh.Id;

    let total = 0;
    const chiTietDonHangs = [];

    for (const item of items) {
      const bienThe = await BienTheSanPham.findByPk(item.bienTheSanPhamId, {
        include: ["SanPham"],
      });
      if (!bienThe)
        throw new Error(`Sản phẩm không tồn tại: ${item.bienTheSanPhamId}`);

      const ThanhTien = bienThe.GiaBan * item.soLuong;
      total += ThanhTien;

      chiTietDonHangs.push({
        SanPhamId: bienThe.SanPhamId,
        BienTheSanPhamId: item.bienTheSanPhamId,
        SoLuong: item.soLuong,
        DonGia: bienThe.GiaBan,
        ThanhTien,
      });
    }

    // 2. Tạo đơn hàng
    const donHang = await DonHang.create({
      KhachHangId: KhachHangId || null,
      TinhThanh: TinhThanh || null,
      QuanHuyen: QuanHuyen || null,
      XaPhuong: XaPhuong || null,
      DiaChiChiTiet: DiaChiChiTiet || null,
      MoTa: MoTa || null,
      PhuongThucThanhToan: PhuongThucThanhToan || null,
      TongTien: TongTien || total,
      TrangThai: "ChoXacNhan",
    });

    // 3. Tạo chi tiết đơn hàng & trừ kho
    for (const ct of chiTietDonHangs) {
      const kho = await TonKho.findOne({
        where: {
          BienTheSanPhamId: ct.BienTheSanPhamId,
          KhoChiNhanhId, // dùng khoChiNhanh.Id tìm kho
        },
      });

      if (!kho)
        throw new Error(
          `Sản phẩm ${ct.SanPhamId} không có trong kho chi nhánh`
        );
      if (kho.SoLuong < ct.SoLuong)
        throw new Error(
          `Sản phẩm ${ct.SanPhamId} trong kho chi nhánh không đủ số lượng`
        );

      kho.SoLuong -= ct.SoLuong;
      await kho.save();

      await ChiTietDonHang.create({
        DonHangId: donHang.Id,
        SanPhamId: ct.SanPhamId,
        BienTheSanPhamId: ct.BienTheSanPhamId,
        SoLuong: ct.SoLuong,
        DonGia: ct.DonGia,
        ThanhTien: ct.ThanhTien,
      });
    }

    return donHang;
  }

  static async getOrdersByCustomer(KhachHangId) {
    if (!KhachHangId) return [];

    return DonHang.findAll({
      where: { KhachHangId },
      include: [
        {
          model: ChiTietDonHang,
          as: "ChiTietDonHangs",
        },
        {
          model: BienTheSanPham,
          as: "BienTheSanPhams",
          include: [
            {
              model: AnhSanPham,
              as: "AnhSanPhams",
            },
            {
              model: SanPham,
              as: "SanPham",
              include: [
                { model: AnhSanPham, as: "AnhSanPhams" }, // nếu muốn lấy ảnh chung của sản phẩm
              ],
            },
          ],
        },
      ],
      order: [["NgayDat", "DESC"]],
    });
  }
}

module.exports = OrderService;
