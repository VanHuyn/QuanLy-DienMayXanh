const OrderService = require("../services/order.service");

class OrderController {
  static async placeOrder(req, res) {
    try {
      const {
        KhachHangId,
        TinhThanh,
        QuanHuyen,
        XaPhuong,
        DiaChiChiTiet,
        MoTa,
        PhuongThucThanhToan,
        items,
        TongTien,
        ChiNhanhId
      } = req.body;
      const donHang = await OrderService.createOrder({
        KhachHangId,
        TinhThanh,
        QuanHuyen,
        XaPhuong,
        DiaChiChiTiet,
        MoTa,
        PhuongThucThanhToan,
        items,
        TongTien,
        ChiNhanhId
      });

      res.status(201).json({ success: true, data: donHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getCustomerOrders(req, res) {
    try {
      const { khachHangId } = req.params;
      const orders = await OrderService.getOrdersByCustomer(khachHangId);
      res.json({ success: true, data: orders });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = OrderController;
