// controllers/khoTong.controller.js
const WarehouseService = require("../services/warehouse.service");

class WarehouseController {
  static async create(req, res) {
    try {
      const kho = await WarehouseService.create(req.body);
      res.status(201).json(kho);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const list = await WarehouseService.getAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const kho = await WarehouseService.getById(req.params.id);
      if (!kho)
        return res.status(404).json({ message: "Kho tổng không tồn tại" });
      res.json(kho);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const kho = await WarehouseService.update(req.params.id, req.body);
      if (!kho)
        return res.status(404).json({ message: "Kho tổng không tồn tại" });
      res.json(kho);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const success = await WarehouseService.delete(req.params.id);
      if (!success)
        return res.status(404).json({ message: "Kho tổng không tồn tại" });
      res.json({ message: "Xóa kho tổng thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = WarehouseController;
