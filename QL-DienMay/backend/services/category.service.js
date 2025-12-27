const { DanhMuc } = require("../models");
const slugify = require("slugify");
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
      Slug: data.Slug
        ? slugify(data.Slug, { lower: true, strict: true, locale: "vi" })
        : slugify(data.Ten, { lower: true, strict: true, locale: "vi" }),
    });
  }

  async update(id, data) {
    const danhMuc = await this.getById(id);
    const payload = {};

    if (data.Ten !== undefined) {
      payload.Ten = data.Ten;
      payload.Slug = slugify(data.Ten, {
        lower: true,
        strict: true,
        locale: "vi",
      });
    }

    if (data.MoTa !== undefined) {
      payload.MoTa = data.MoTa;
    }

    if (data.Slug) {
      payload.Slug = slugify(data.Slug, {
        lower: true,
        strict: true,
        locale: "vi",
      });
    }
    console.log(payload)
    return await danhMuc.update(payload);
  }

  async delete(id) {
    const danhMuc = await this.getById(id);
    return await danhMuc.destroy();
  }
}

module.exports = new CategoryService();
