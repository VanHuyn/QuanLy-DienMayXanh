const userService = require("../services/user.service");

class UserController {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "Tạo người dùng thành công",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getByBranch(req, res) {
    try {
      const { chiNhanhId } = req.params;

      const users = await userService.getUsersByBranch(chiNhanhId);

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const updatedUser = await userService.updateUser(id, req.body);

      return res.status(200).json({
        success: true,
        message: "Cập nhật người dùng thành công",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: "Xóa người dùng thành công",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async updateMe(req, res) {
    try {
      const userId = req.user.userId; 
      console.log(userId)
      const updatedUser = await userService.updateProfile(userId, req.body);

      return res.json({
        success: true,
        message: "Cập nhật thông tin thành công",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
