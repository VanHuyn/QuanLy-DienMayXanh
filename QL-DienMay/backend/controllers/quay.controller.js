const QuayService = require("../services/quay.service");

class QuayController {
  static async sellAtQuay(req, res) {
    try {
      const { items, PhuongThucThanhToan, MoTa, KhachHangId } = req.body;
      const ChiNhanhId = req.user.chiNhanhId;
      //  ở đây sẽ có NhanVienId
      const NhanVienId = req.user.nhanVienId
      console.log(NhanVienId)
      if (!ChiNhanhId)
        return res.status(400).json({ success: false, message: "Người dùng không có chi nhánh" });

      const donHang = await QuayService.createOrderAtQuay({
        items,
        PhuongThucThanhToan,
        MoTa,
        ChiNhanhId,
        KhachHangId: KhachHangId || null,
        NhanVienId
      });

      res.status(201).json({ success: true, data: donHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = QuayController;
