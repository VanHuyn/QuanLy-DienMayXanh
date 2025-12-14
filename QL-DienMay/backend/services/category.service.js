const { DanhMuc } = require("../models");

class CategoryService {
  async getAll() {
    return await DanhMuc.findAll({ order: [["Id", "DESC"]] });
  }

  async getById(id) {
    const danhMuc = await DanhMuc.findByPk(id);
    if (!danhMuc) throw new Error("Danh mục không tồn tại!");
    return danhMuc;
  }

  async create(data) {
    return await DanhMuc.create({
      Ten: data.Ten,
      MoTa: data.MoTa || null,
    });
  }

  async update(id, data) {
    const danhMuc = await this.getById(id);
    return await danhMuc.update({
      Ten: data.Ten,
      MoTa: data.MoTa,
    });
  }

  async delete(id) {
    const danhMuc = await this.getById(id);
    return await danhMuc.destroy();
  }
}

module.exports = new CategoryService();
