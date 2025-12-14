// services/nhacungcap.service.js
const { NhaCungCap } = require("../models");

class SupplierService {
  async getAll() {
    return await NhaCungCap.findAll({ order: [["Id", "DESC"]] });
  }

  async getById(id) {
    const ncc = await NhaCungCap.findByPk(id);
    if (!ncc) throw new Error("Nhà cung cấp không tồn tại!");
    return ncc;
  }

  async create(data) {
    return await NhaCungCap.create({
      Ten: data.Ten,
      DiaChi: data.DiaChi || null,
      SoDienThoai: data.SoDienThoai || null,
      Email: data.Email || null,
    });
  }

  async update(id, data) {
    const ncc = await this.getById(id);

    return await ncc.update({
      Ten: data.Ten,
      DiaChi: data.DiaChi,
      SoDienThoai: data.SoDienThoai,
      Email: data.Email,
    });
  }

  async delete(id) {
    const ncc = await this.getById(id);
    return await ncc.destroy();
  }
}

module.exports = new SupplierService();
