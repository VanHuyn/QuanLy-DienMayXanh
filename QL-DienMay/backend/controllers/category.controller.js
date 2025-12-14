// controllers/danhmuc.controller.js
const CategoryService = require("../services/category.service");

class CategoryController {
  async getAll(req, res) {
    try {
      const data = await CategoryService.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const data = await CategoryService.getById(id);
      res.json({ success: true, data });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = await CategoryService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const updated = await CategoryService.update(id, req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await CategoryService.delete(id);
      res.json({ success: true, message: "Xóa danh mục thành công!" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new CategoryController();
