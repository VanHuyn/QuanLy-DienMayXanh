const ProductService = require("../services/product.service");

class ProductController {
  static async create(req, res) {
    try {
      const product = await ProductService.create(req.body, req.files);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ProductService.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await ProductService.getById(req.params.id);
      if (!data)
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
  static async getByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { branchId } = req.query;
      console.log({ categoryId, branchId });
      if (!branchId) {
        return res.status(400).json({
          message: "Thiếu branchId",
        });
      }

      const data = await ProductService.getByCategory(categoryId, branchId);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
  static async getByCategorySlug(req, res) {
    try {
      const { slug } = req.params;
      const { branchId } = req.query;
      if (!branchId) {
        return res.status(400).json({ message: "Thiếu branchId" });
      }

      const data = await ProductService.getByCategorySlug(slug, branchId);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await ProductService.update(
        req.params.id,
        req.body,
        req.files
      );
      if (!data)
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const ok = await ProductService.delete(req.params.id);
      if (!ok)
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = ProductController;
