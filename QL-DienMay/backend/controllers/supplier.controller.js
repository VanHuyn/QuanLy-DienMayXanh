const SupplierService = require("../services/supplier.service");

class SupplierController {
  async getAll(req, res) {
    try {
      const data = await SupplierService.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const data = await SupplierService.getById(id);
      res.json({ success: true, data });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = await SupplierService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const data = await SupplierService.update(id, req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await SupplierService.delete(id);
      res.json({ success: true, message: "Xóa nhà cung cấp thành công!" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new SupplierController();
