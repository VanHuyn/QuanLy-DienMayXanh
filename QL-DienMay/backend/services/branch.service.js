const { ChiNhanh } = require("../models");

const BranchService = {
  // Lấy tất cả chi nhánh
  getAll: async () => {
    return await ChiNhanh.findAll({
      order: [["createdAt", "DESC"]],
    });
  },

  // Lấy chi nhánh theo ID
  getById: async (id) => {
    return await ChiNhanh.findByPk(id);
  },

  // Tạo chi nhánh
  create: async (data) => {
    const { Ten, Ma, DiaChi, SoDienThoai, Email } = data;

    if (!Ten) {
      throw new Error("Tên chi nhánh là bắt buộc");
    }

    return await ChiNhanh.create({
      Ten,
      Ma,
      DiaChi,
      SoDienThoai,
      Email,
    });
  },

  // Cập nhật chi nhánh
  update: async (id, data) => {
    const branch = await ChiNhanh.findByPk(id);
    if (!branch) throw new Error("Chi nhánh không tồn tại");

    await branch.update(data);
    return branch;
  },

  // Xoá chi nhánh
  delete: async (id) => {
    const branch = await ChiNhanh.findByPk(id);
    if (!branch) throw new Error("Chi nhánh không tồn tại");

    await branch.destroy();
    return true;
  },
};

module.exports = BranchService;
