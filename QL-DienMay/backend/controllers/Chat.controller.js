const ChatService = require("../services/Chat.service");

class ChatController {
  // Tạo hoặc lấy cuộc trò chuyện
  static async getOrCreateCuocTroChuyen(req, res) {
    try {
      const { KhachHangId } = req.body;
      const NhanVienId = req.user.nhanVienId;
      const cuoc = await ChatService.getOrCreateCuocTroChuyen({ KhachHangId, NhanVienId });
      res.status(200).json({ success: true, data: cuoc });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
   static async layTatCaCuocTroChuyen(req, res) {
    try {
      const NhanVienId = req.user.nhanVienId;
      const cuocTroChuyens = await ChatService.layTatCaCuocTroChuyen(NhanVienId);
      res.status(200).json({ success: true, data: cuocTroChuyens });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  static async timKhachHangTheoSDT(req, res) {
    try {
      const { soDienThoai } = req.query;
      const khachHang = await ChatService.timKhachHangTheoSDT(soDienThoai);
      res.status(200).json({ success: true, data: khachHang });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  // Gửi tin nhắn
  static async guiTinNhan(req, res) {
    try {
      const { CuocTroChuyenId, NoiDung } = req.body;
      const NguoiGui = req.user?.nhanVienId ? "NhanVien" : "KhachHang";
      const tin = await ChatService.guiTinNhan({ CuocTroChuyenId, NguoiGui, NoiDung });
      res.status(201).json({ success: true, data: tin });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // Lấy tin nhắn
  static async layTinNhan(req, res) {
    try {
      const { CuocTroChuyenId } = req.params;
      const tinNhan = await ChatService.layTatCaTinNhan(CuocTroChuyenId);
      res.status(200).json({ success: true, data: tinNhan });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  static async layCuocTroChuyenKhach(req, res) {
  try {
    const KhachHangId = req.user.khachHangId; 
    console.log(req.user)
    if (!KhachHangId) throw new Error("Chưa đăng nhập khách hàng");
    const cuoc = await ChatService.layCuocTroChuyenKhach(KhachHangId);
    res.status(200).json({ success: true, data: cuoc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
}

module.exports = ChatController;
