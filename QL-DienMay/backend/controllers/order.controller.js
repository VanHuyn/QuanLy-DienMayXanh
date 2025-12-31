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
        ChiNhanhId,
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
        ChiNhanhId,
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
  static async getAllOrders(req, res) {
    try {
      const { trangThai } = req.query; // có thể lọc trạng thái
      const orders = await OrderService.getAllOrders(trangThai);
      res.json({ success: true, data: orders });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Lấy chi tiết đơn hàng (admin)
  static async getOrderDetail(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderDetail(id);
      if (!order)
        return res
          .status(404)
          .json({ success: false, message: "Đơn hàng không tồn tại" });
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
  static async getBranchOrders(req, res) {
  try {
    const branchId = req.user.chiNhanhId; // Giả sử user có ChiNhanhId
    console.log(req.user)
    if (!branchId)
      return res.status(400).json({ success: false, message: "Người dùng không có chi nhánh" });

    const orders = await OrderService.getOrdersByBranch(branchId);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
  // Cập nhật trạng thái đơn hàng
  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { TrangThai } = req.body;
      console.log(TrangThai);
      if (!TrangThai)
        return res
          .status(400)
          .json({ success: false, message: "Thiếu trạng thái mới" });

      const updated = await OrderService.updateOrderStatus(id, TrangThai);
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = OrderController;
