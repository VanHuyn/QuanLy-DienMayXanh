const userService = require("../services/user.service");

class UserController {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({
        message: "Tạo người dùng thành công",
        data: user,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({ data: users });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await userService.updateUser(req.params.id, req.body);
      return res.status(200).json({
        message: "Cập nhật người dùng thành công",
        data: updated,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      return res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
