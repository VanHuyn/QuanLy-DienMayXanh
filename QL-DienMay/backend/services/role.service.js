const { VaiTro } = require("../models");

class RoleService {
  async create(data) {
    const { Ten, MoTa } = data;

    // Kiểm tra trùng tên
    const existed = await VaiTro.findOne({ where: { Ten } });
    if (existed) throw new Error("Tên vai trò đã tồn tại");

    return await VaiTro.create({ Ten, MoTa });
  }

  async getAll() {
    return await VaiTro.findAll({ order: [["Id", "ASC"]] });
  }

  async getById(id) {
    const role = await VaiTro.findByPk(id);
    if (!role) throw new Error("Không tìm thấy vai trò");
    return role;
  }

  async update(id, data) {
    const role = await VaiTro.findByPk(id);
    if (!role) throw new Error("Vai trò không tồn tại");

    await role.update(data);
    return role;
  }

  async delete(id) {
    const role = await VaiTro.findByPk(id);
    if (!role) throw new Error("Không tìm thấy vai trò");

    try {
      await role.destroy();
      return true;
    } catch (err) {
      // Nếu lỗi Foreign Key (ER_ROW_IS_REFERENCED)
      if (err.original && err.original.code === "ER_ROW_IS_REFERENCED_2") {
        throw new Error("Không thể xóa vai trò vì đang có người dùng sử dụng");
      }
      throw err;
    }
  }
}

module.exports = new RoleService();
