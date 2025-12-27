const {
  GioHang,
  ChiTietGioHang,
  BienTheSanPham,
  KhachHang,
  AnhSanPham,
  SanPham,
} = require("../models");

class CartService {
  static async getByCustomerId(userId) {
    if (!userId) return null;
    const customer = await KhachHang.findOne({
      where: { NguoiDungId: userId },
    });
    if (!customer) return null;
    const cart = await GioHang.findOne({
      where: { KhachHangId: customer.Id },
      include: [
        {
          model: ChiTietGioHang,
          as: "ChiTietGioHangs",
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
                      required: false, // không bắt buộc có ảnh chính
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return cart;
  }
  static async addItem(userId, bienTheId, quantity = 1) {
    if (!userId) {
      throw new Error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ");
    }
    let customer = await KhachHang.findOne({ where: { NguoiDungId: userId } });
    if (!customer) {
      customer = await KhachHang.create({ NguoiDungId: userId });
    }
    let cart = await GioHang.findOne({ where: { KhachHangId: customer.Id } });
    if (!cart) {
      cart = await GioHang.create({ KhachHangId: customer.Id });
    }
    let cartItem = await ChiTietGioHang.findOne({
      where: { GioHangId: cart.Id, BienTheSanPhamId: bienTheId },
    });

    if (cartItem) {
      cartItem.SoLuong += quantity;
      await cartItem.save();
    } else {
      cartItem = await ChiTietGioHang.create({
        GioHangId: cart.Id,
        BienTheSanPhamId: bienTheId,
        SoLuong: quantity,
      });
    }

    return cartItem;
  }

  static async updateItem(cartItemId, quantity) {
    const cartItem = await ChiTietGioHang.findByPk(cartItemId);
    if (!cartItem) throw new Error("Cart item not found");

    if (quantity <= 0) {
      await cartItem.destroy();
      return null;
    }

    cartItem.SoLuong = quantity;
    await cartItem.save();
    return cartItem;
  }
  static async removeItem(cartItemId) {
    const cartItem = await ChiTietGioHang.findByPk(cartItemId);
    if (!cartItem) throw new Error("Cart item not found");

    await cartItem.destroy();
    return true;
  }
  static async clearCart(userId) {
    const customer = await KhachHang.findOne({
      where: { NguoiDungId: userId },
    });
    if (!customer) throw new Error("Khách hàng không tồn tại");
    const cart = await GioHang.findOne({ where: { KhachHangId: customer.Id } });
    if (!cart) return false;
    await ChiTietGioHang.destroy({ where: { GioHangId: cart.Id } });
    return true;
  }
}

module.exports = CartService;
