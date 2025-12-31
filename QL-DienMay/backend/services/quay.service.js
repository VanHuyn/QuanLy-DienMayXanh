const {
  DonHang,
  ChiTietDonHang,
  BienTheSanPham,
  TonKho,
  PhieuBaoHanh,
  PhieuDoiTra,
  PhieuThanhToan,
  KhoChiNhanh,
  KhachHang,
} = require("../models");

class QuayService {
  // Bán hàng tại quầy, có thể truyền KhachHangId (khách vãng lai thì null)
  static async createOrderAtQuay({
    items,
    PhuongThucThanhToan,
    ChiNhanhId,
    MoTa,
    KhachHangId,
    NhanVienId,
  }) {
    if (!items || !items.length) throw new Error("Danh sách sản phẩm trống");
    if (!ChiNhanhId) throw new Error("Chi nhánh chưa được chọn");

    // Lấy kho chi nhánh
    const khoChiNhanh = await KhoChiNhanh.findOne({ where: { ChiNhanhId } });
    if (!khoChiNhanh) throw new Error("Chi nhánh chưa có kho");
    const KhoChiNhanhId = khoChiNhanh.Id;

    // Xác thực khách hàng (nếu có)
    let khachHangIdThuc = null;
    if (KhachHangId) {
      const kh = await KhachHang.findByPk(KhachHangId);
      if (!kh) throw new Error("Khách hàng không tồn tại");
      khachHangIdThuc = kh.Id;
    }

    // Tính tổng tiền và chuẩn bị chi tiết đơn hàng
    let total = 0;
    const chiTietDonHangs = [];

    for (const item of items) {
      const bienThe = await BienTheSanPham.findByPk(item.bienTheSanPhamId, {
        include: ["SanPham"],
      });
      if (!bienThe)
        throw new Error(`Sản phẩm không tồn tại: ${item.bienTheSanPhamId}`);
      if (!item.soLuong || item.soLuong <= 0)
        throw new Error("Số lượng không hợp lệ");

      const donGia = bienThe.GiaKhuyenMai || bienThe.Gia || 0;
      const ThanhTien = donGia * item.soLuong;
      total += ThanhTien;

      chiTietDonHangs.push({
        SanPhamId: bienThe.SanPhamId,
        BienTheSanPhamId: item.bienTheSanPhamId,
        SoLuong: item.soLuong,
        DonGia: donGia,
        ThanhTien,
      });
    }

    // 1. Tạo đơn hàng
    const donHang = await DonHang.create({
      KhachHangId: khachHangIdThuc,
      MoTa: MoTa || null,
      PhuongThucThanhToan: PhuongThucThanhToan || "TienMat",
      TongTien: total,
      TrangThai: "DaHoanTat",
      ChiNhanhId,
      NhanVienId,
    });

    // 2. Tạo chi tiết đơn hàng & trừ kho
    for (const ct of chiTietDonHangs) {
      const kho = await TonKho.findOne({
        where: { BienTheSanPhamId: ct.BienTheSanPhamId, KhoChiNhanhId },
      });
      if (!kho) throw new Error(`Sản phẩm ${ct.SanPhamId} không có trong kho`);
      if (kho.SoLuong < ct.SoLuong)
        throw new Error(`Sản phẩm ${ct.SanPhamId} không đủ số lượng`);

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

      // 3. Tạo phiếu bảo hành & đổi trả chỉ khi khách có ID
      if (khachHangIdThuc) {
        await PhieuBaoHanh.create({
          DonHangId: donHang.Id,
          KhachHangId: khachHangIdThuc,
          SanPhamId: ct.SanPhamId,
          TrangThai: "Moi",
        });

        await PhieuDoiTra.create({
          DonHangId: donHang.Id,
          KhachHangId: khachHangIdThuc,
          LyDo: "",
          TrangThai: "ChoXuLy",
        });
      }
    }

    // 4. Tạo phiếu thanh toán tổng đơn
    await PhieuThanhToan.create({
      DonHangId: donHang.Id,
      SoTien: total,
      PhuongThuc: PhuongThucThanhToan || "TienMat",
      TrangThai: "DaThanhToan",
    });

    // 5. Fetch lại đơn hàng đầy đủ với chi tiết và thanh toán
    const donHangFull = await DonHang.findByPk(donHang.Id, {
      include: [
        { model: ChiTietDonHang, as: "ChiTietDonHangs" },
        { model: PhieuThanhToan, as: "PhieuThanhToans" },
        { model: KhachHang, as: "KhachHang" },
      ],
    });

    return donHangFull;
  }
}

module.exports = QuayService;
