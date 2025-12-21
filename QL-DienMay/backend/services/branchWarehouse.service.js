const db = require("../models");
const BranchWarehouse = db.KhoChiNhanh;
const Branch = db.ChiNhanh;

class BranchWarehouseService {
  async getAll() {
    return await BranchWarehouse.findAll({
      include: [
        {
          model: Branch,
          as: "ChiNhanh",
          attributes: ["Id", "Ten", "Ma"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async getById(id) {
    return await BranchWarehouse.findByPk(id, {
      include: [{ model: Branch, as: "ChiNhanh" }],
    });
  }

  async create(data) {
    return await BranchWarehouse.create({
      ChiNhanhId: data.ChiNhanhId,
      Ten: data.Ten,
      DiaChi: data.DiaChi,
    });
  }

  async update(id, data) {
    const warehouse = await BranchWarehouse.findByPk(id);
    if (!warehouse) throw new Error("Branch warehouse not found");

    await warehouse.update({
      ChiNhanhId: data.ChiNhanhId,
      Ten: data.Ten,
      DiaChi: data.DiaChi,
    });

    return warehouse;
  }

  async delete(id) {
    const warehouse = await BranchWarehouse.findByPk(id);
    if (!warehouse) throw new Error("Branch warehouse not found");

    await warehouse.destroy();
    return true;
  }
}

module.exports = new BranchWarehouseService();
