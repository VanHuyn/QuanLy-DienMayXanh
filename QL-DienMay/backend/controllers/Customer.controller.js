const { KhachHang, NguoiDung } = require("../models");

class CustomerController {
  // Kiểm tra email
  static async checkEmail(req, res) {
    try {
      const { email } = req.query;
      if (!email) return res.status(400).json({ success: false, message: "Thiếu email" });

      const nguoiDung = await NguoiDung.findOne({ where: { Email: email } });
      if (!nguoiDung) return res.json({ success: true, data: null });

      const khachHang = await KhachHang.findOne({ where: { NguoiDungId: nguoiDung.Id } });
      if (!khachHang) return res.json({ success: true, data: null });

      res.json({ success: true, data: khachHang });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = CustomerController;
