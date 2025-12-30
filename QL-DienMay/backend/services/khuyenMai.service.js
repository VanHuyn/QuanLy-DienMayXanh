const { KhuyenMai } = require("../models");
const { Op } = require("sequelize");

class KhuyenMaiService {
  // CREATE
  static async create(data) {
    return await KhuyenMai.create({
      Ma: data.Ma || null,
      Ten: data.Ten,
      PhanTramGiam: data.PhanTramGiam || null,
      NgayBatDau: data.NgayBatDau || null,
      NgayKetThuc: data.NgayKetThuc || null,
      ApDungChoTatCa: data.ApDungChoTatCa ?? false,
    });
  }

  // READ - get all
  static async getAll({ active } = {}) {
    const where = {};

    if (active) {
      const now = new Date();
      where[Op.or] = [
        { ApDungChoTatCa: true },
        {
          NgayBatDau: { [Op.lte]: now },
          NgayKetThuc: { [Op.gte]: now },
        },
      ];
    }

    return await KhuyenMai.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
  }

  // READ - get by id
  static async getById(id) {
    const khuyenMai = await KhuyenMai.findByPk(id);
    if (!khuyenMai) throw new Error("Promotion not found");
    return khuyenMai;
  }

  // UPDATE
  static async update(id, data) {
    const khuyenMai = await KhuyenMai.findByPk(id);
    if (!khuyenMai) throw new Error("Promotion not found");

    await khuyenMai.update({
      Ma: data.Ma,
      Ten: data.Ten,
      PhanTramGiam: data.PhanTramGiam,
      NgayBatDau: data.NgayBatDau,
      NgayKetThuc: data.NgayKetThuc,
      ApDungChoTatCa: data.ApDungChoTatCa,
    });

    return khuyenMai;
  }

  // DELETE
  static async delete(id) {
    const khuyenMai = await KhuyenMai.findByPk(id);
    if (!khuyenMai) throw new Error("Promotion not found");

    await khuyenMai.destroy();
    return true;
  }
  static async checkCode(code) {
  if (!code) {
    throw new Error("Promotion code is required");
  }

  const now = new Date();

  const khuyenMai = await KhuyenMai.findOne({
    where: {
      Ma: code,
      NgayBatDau: { [Op.lte]: now },
      NgayKetThuc: { [Op.gte]: now },
    },
  });

  if (!khuyenMai) {
    throw new Error("Promotion code is invalid or expired");
  }

  return khuyenMai;
}
}

module.exports = KhuyenMaiService;
