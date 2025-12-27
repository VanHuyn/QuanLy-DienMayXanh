const CartService = require('../services/cart.service');

class CartController {
  static async getCart(req, res) {
    try {
      const customerId = req.user.userId; // Lấy từ JWT
      const cart = await CartService.getByCustomerId(customerId);
      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async addItem(req, res) {
    try {
      const customerId = req.user.userId; // Lấy từ JWT
      const { bienTheId, quantity } = req.body;

      const cartItem = await CartService.addItem(customerId, bienTheId, quantity);
      res.json({ success: true, data: cartItem });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async updateItem(req, res) {
    try {
      const { quantity } = req.body;
      const cartItemId = req.params.id;

      const cartItem = await CartService.updateItem(cartItemId, quantity);
      res.json({ success: true, data: cartItem });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async removeItem(req, res) {
    try {
      const cartItemId = req.params.id;
      await CartService.removeItem(cartItemId);
      res.json({ success: true, message: 'Bạn đã xoá sản phẩm' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async clearCart(req, res) {
    try {
      const customerId = req.user.userId; // Lấy từ JWT
      await CartService.clearCart(customerId);
      res.json({ success: true, message: 'Đã xoá toàn bộ giỏ hàng' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = CartController;
