const { CuocTroChuyen, TinNhan, KhachHang, NhanVien, NguoiDung } = require("../models");

class ChatService {
  // Lấy hoặc tạo cuộc trò chuyện giữa nhân viên và khách
  static async getOrCreateCuocTroChuyen({ KhachHangId, NhanVienId }) {
    if (!KhachHangId && !NhanVienId) throw new Error("Thiếu thông tin người dùng");

    let cuoc = await CuocTroChuyen.findOne({
      where: { KhachHangId, NhanVienId },
      include: [{ model: TinNhan, as: "TinNhans" }],
    });

    if (!cuoc) {
      cuoc = await CuocTroChuyen.create({ KhachHangId, NhanVienId });
    }

    return cuoc;
  }

  // Lấy tất cả cuộc trò chuyện của nhân viên
  static async layTatCaCuocTroChuyen(NhanVienId) {
    if (!NhanVienId) throw new Error("Thiếu NhanVienId");
    return await CuocTroChuyen.findAll({
      where: { NhanVienId },
      include: [
        {
          model: KhachHang,
          as: "KhachHang",
          include: [{ model: NguoiDung, as: "NguoiDung" }],
        },
        { model: TinNhan, as: "TinNhans", limit: 1, order: [["createdAt", "DESC"]] },
      ],
      order: [["updatedAt", "DESC"]],
    });
  }

  // Lấy tất cả tin nhắn theo cuộc trò chuyện
  static async layTatCaTinNhan(CuocTroChuyenId) {
    return await TinNhan.findAll({
      where: { CuocTroChuyenId },
      order: [["createdAt", "ASC"]],
    });
  }

  // Gửi tin nhắn
  static async guiTinNhan({ CuocTroChuyenId, NguoiGui, NoiDung }) {
    if (!CuocTroChuyenId || !NguoiGui || !NoiDung) throw new Error("Thiếu thông tin gửi tin nhắn");

    const tin = await TinNhan.create({
      CuocTroChuyenId,
      NguoiGui,
      NoiDung,
      DaXem: false,
    });

    return tin;
  }

  // Tìm khách hàng theo số điện thoại
  static async timKhachHangTheoSDT(soDienThoai) {
    return await KhachHang.findOne({
      include: [
        {
          model: NguoiDung,
          as: "NguoiDung",
          where: { SoDienThoai: soDienThoai },
        },
      ],
    });
  }

  // Lấy cuộc trò chuyện của khách hàng
  static async layCuocTroChuyenKhach(KhachHangId, options = { createIfNotExist: true }) {
    if (!KhachHangId) throw new Error("Chưa đăng nhập khách hàng");

    let cuoc = await CuocTroChuyen.findOne({
      where: { KhachHangId },
      include: [
        { model: TinNhan, as: "TinNhans", order: [["createdAt", "ASC"]] },
        { model: NhanVien, as: "NhanVien" },
      ],
    });

    // Chỉ tạo mới nếu options.createIfNotExist = true
    if (!cuoc && options.createIfNotExist) {
      cuoc = await CuocTroChuyen.create({ KhachHangId });
    }

    return cuoc;
  }
}

module.exports = ChatService;
