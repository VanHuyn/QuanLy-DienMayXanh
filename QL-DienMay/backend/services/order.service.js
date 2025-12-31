const {
  DonHang,
  ChiTietDonHang,
  BienTheSanPham,
  TonKho,
  PhieuBaoHanh,
  PhieuDoiTra,
  KhachHang,
  PhieuThanhToan,
  SanPham,
  AnhSanPham,
  NguoiDung,
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
    ChiNhanhId,
  }) {
    if (!items || !items.length) throw new Error("Danh sách sản phẩm trống");
    if (!ChiNhanhId) throw new Error("Chi nhánh chưa được chọn");

    const khoChiNhanh = await KhoChiNhanh.findOne({ where: { ChiNhanhId } });
    if (!khoChiNhanh) throw new Error("Chi nhánh chưa có kho");
    let khachHangIdThuc = KhachHangId;
    if (KhachHangId) {
      const khachHang = await KhachHang.findOne({
        where: { NguoiDungId: KhachHangId },
      });
      if (!khachHang) throw new Error("Khách hàng không tồn tại");
      khachHangIdThuc = khachHang.Id;
    }
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

    // 1. Tạo đơn hàng
    const donHang = await DonHang.create({
      KhachHangId: khachHangIdThuc || null,
      TinhThanh: TinhThanh || null,
      QuanHuyen: QuanHuyen || null,
      XaPhuong: XaPhuong || null,
      DiaChiChiTiet: DiaChiChiTiet || null,
      MoTa: MoTa || null,
      PhuongThucThanhToan: PhuongThucThanhToan || null,
      TongTien: TongTien || total,
      TrangThai: "ChoXacNhan",
      ChiNhanhId: ChiNhanhId || null,
    });

    // 2. Tạo chi tiết đơn hàng & trừ kho
    for (const ct of chiTietDonHangs) {
      const kho = await TonKho.findOne({
        where: {
          BienTheSanPhamId: ct.BienTheSanPhamId,
          KhoChiNhanhId,
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

      // 3. Tạo phiếu bảo hành cho từng sản phẩm nếu cần
      await PhieuBaoHanh.create({
        DonHangId: donHang.Id,
        KhachHangId: khachHangIdThuc,
        SanPhamId: ct.SanPhamId,
        TrangThai: "Moi",
      });

      // 4. Tạo phiếu đổi trả cho từng sản phẩm (mặc định chưa xử lý)
      await PhieuDoiTra.create({
        DonHangId: donHang.Id,
        KhachHangId: khachHangIdThuc,
        LyDo: "",
        TrangThai: "ChoXuLy",
      });
    }

    // 5. Tạo phiếu thanh toán tổng đơn
    await PhieuThanhToan.create({
      DonHangId: donHang.Id,
      SoTien: TongTien || total,
      PhuongThuc: PhuongThucThanhToan || "ChuaXacDinh",
      TrangThai: "DangCho",
    });

    return donHang;
  }
  // Lấy tất cả đơn hàng của 1 khách hàng
  static async getOrdersByCustomer(userId) {
    if (!userId) throw new Error("Người dùng không xác định");

    // Lấy KhachHangId từ NguoiDungId
    const khachHang = await KhachHang.findOne({
      where: { NguoiDungId: userId },
    });
    if (!khachHang) throw new Error("Khách hàng không tồn tại");

    console.log("KhachHangId:", khachHang.Id);

    return DonHang.findAll({
      where: { KhachHangId: khachHang.Id },
      include: [
        {
          model: ChiTietDonHang,
          as: "ChiTietDonHangs",
          include: [
            {
              model: BienTheSanPham,
              as: "BienTheSanPham",
              include: [
                {
                  model: SanPham,
                  as: "SanPham",
                  include: [
                    {
                      model: AnhSanPham,
                      as: "AnhSanPhams",
                      where: { LaChinh: true },
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { model: PhieuThanhToan, as: "PhieuThanhToans" },
        { model: PhieuBaoHanh, as: "PhieuBaoHanhs" },
        { model: PhieuDoiTra, as: "PhieuDoiTras" },
      ],
      order: [["NgayDat", "DESC"]],
    });
  }

  static async getAllOrders(trangThai) {
    const where = {};
    if (trangThai) where.TrangThai = trangThai;

    return DonHang.findAll({
      where,
      include: [
        // Thông tin khách hàng
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
        // Chi tiết sản phẩm
        {
          model: ChiTietDonHang,
          as: "ChiTietDonHangs",
          include: [
            {
              model: BienTheSanPham,
              as: "BienTheSanPham",
              include: [
                {
                  model: SanPham,
                  as: "SanPham",
                  include: [{ model: AnhSanPham, as: "AnhSanPhams" }],
                },
              ],
            },
          ],
        },
        { model: PhieuThanhToan, as: "PhieuThanhToans" },
        { model: PhieuBaoHanh, as: "PhieuBaoHanhs" },
        { model: PhieuDoiTra, as: "PhieuDoiTras" },
      ],
      order: [["NgayDat", "DESC"]],
    });
  }
  static async getOrdersByBranch(branchId) {
    return DonHang.findAll({
      where: { ChiNhanhId: branchId },
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
                {
                  model: SanPham,
                  as: "SanPham",
                  include: [{ model: AnhSanPham, as: "AnhSanPhams" }],
                },
              ],
            },
          ],
        },
        { model: PhieuThanhToan, as: "PhieuThanhToans" },
        { model: PhieuBaoHanh, as: "PhieuBaoHanhs" },
        { model: PhieuDoiTra, as: "PhieuDoiTras" }, // Sửa lại alias đúng
      ],
      order: [["NgayDat", "DESC"]],
    });
  }

  // Chi tiết 1 đơn hàng
  static async getOrderDetail(Id) {
    return DonHang.findOne({
      where: { Id },
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
                {
                  model: SanPham,
                  as: "SanPham",
                  include: [{ model: AnhSanPham, as: "AnhSanPhams" }],
                },
              ],
            },
          ],
        },
        { model: PhieuThanhToan, as: "PhieuThanhToans" },
        { model: PhieuBaoHanh, as: "PhieuBaoHanhs" },
        { model: PhieuDoiTra, as: "PhieuDoiTras" },
      ],
    });
  }

  // Cập nhật trạng thái đơn hàng
  static async updateOrderStatus(Id, TrangThai) {
    const order = await DonHang.findByPk(Id);
    if (!order) throw new Error("Đơn hàng không tồn tại");
    order.TrangThai = TrangThai;
    await order.save();
    return order;
  }
}
module.exports = OrderService;
