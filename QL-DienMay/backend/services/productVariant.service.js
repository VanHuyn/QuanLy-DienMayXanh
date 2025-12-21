const { BienTheSanPham, SanPham } = require("../models");

class ProductVariantService {
  async getAll() {
    return await BienTheSanPham.findAll({
      include: [{ model: SanPham, as: "SanPham", attributes: ["Ten"] }],
      order: [["Id", "DESC"]],
    });
  }

  async getById(id) {
    const variant = await BienTheSanPham.findByPk(id, {
      include: [{ model: SanPham, as: "SanPham" }],
    });
    if (!variant) throw new Error("Biến thể sản phẩm không tồn tại");
    return variant;
  }
}

module.exports = new ProductVariantService();
