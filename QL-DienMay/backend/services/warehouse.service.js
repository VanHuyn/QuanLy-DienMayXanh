const { KhoTong } = require("../models");

class WarehouseService {
  static async create(data) {
    return await KhoTong.create(data);
  }

  static async getAll() {
    return await KhoTong.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  static async getById(id) {
    return await KhoTong.findByPk(id);
  }

  static async update(id, data) {
    const kho = await KhoTong.findByPk(id);
    if (!kho) return null;
    await kho.update(data);
    return kho;
  }

  static async delete(id) {
    const kho = await KhoTong.findByPk(id);
    if (!kho) return null;
    await kho.destroy();
    return true;
  }
}

module.exports = WarehouseService;
