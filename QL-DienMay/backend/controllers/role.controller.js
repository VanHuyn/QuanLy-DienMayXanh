const roleService = require("../services/role.service");

class RoleController {
  async create(req, res) {
    try {
      const data = await roleService.create(req.body);
      res.status(201).json({ message: "Tạo vai trò thành công", data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const data = await roleService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await roleService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const data = await roleService.update(req.params.id, req.body);
      res.json({ message: "Cập nhật thành công", data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await roleService.delete(req.params.id);
      res.json({ message: "Xoá vai trò thành công" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new RoleController();
