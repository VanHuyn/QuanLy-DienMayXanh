const {
  SanPham,
  AnhSanPham,
  DanhMuc,
  BienTheSanPham,
  sequelize,
} = require("../models");

class ProductService {
  static async create(data, files) {
    const transaction = await sequelize.transaction();
    try {
      const { BienTheSanPhams = [], ...sanPhamData } = data;

      const product = await SanPham.create(sanPhamData, { transaction });
      let bienTheList = BienTheSanPhams;
      if (!bienTheList.length) {
        bienTheList = [
          {
            Ten: sanPhamData.Ten,
            Gia: sanPhamData.Gia,
          },
        ];
      }

      const bienTheData = bienTheList.map((bt) => ({
        SanPhamId: product.Id,
        Ten: bt.Ten,
        Gia: bt.Gia ?? sanPhamData.Gia,
      }));

      await BienTheSanPham.bulkCreate(bienTheData, { transaction });

      // 3️⃣ Lưu ảnh
      if (files?.length) {
        const images = files.map((f) => ({
          SanPhamId: product.Id,
          Url: f.path,
        }));
        await AnhSanPham.bulkCreate(images, { transaction });
      }

      await transaction.commit();
      return product;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getAll() {
    return await SanPham.findAll({
      include: [
        { model: DanhMuc, as: "DanhMuc" },
        { model: AnhSanPham, as: "AnhSanPhams" },
        { model: BienTheSanPham, as: "BienTheSanPhams" },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  static async getById(id) {
    return await SanPham.findByPk(id, {
      include: ["AnhSanPhams", "DanhMuc", "BienTheSanPhams"],
    });
  }

static async update(id, data, files) {
  const transaction = await sequelize.transaction();
  try {
    const { BienTheSanPhams = [], ...sanPhamData } = data;

    const product = await SanPham.findByPk(id, {
      include: [{ model: BienTheSanPham, as: "BienTheSanPhams" }],
      transaction,
    });

    if (!product) {
      await transaction.rollback();
      return null;
    }

    await product.update(sanPhamData, { transaction });

    if (BienTheSanPhams.length) {
      const currentVariants = product.BienTheSanPhams;

      const incomingIds = BienTheSanPhams
        .filter(v => v.Id)
        .map(v => v.Id);

      for (const v of currentVariants) {
        if (!incomingIds.includes(v.Id)) {
          await v.destroy({ transaction });
        }
      }
      for (const v of BienTheSanPhams) {
        if (v.Id) {
          await BienTheSanPham.update(
            { Ten: v.Ten, Gia: v.Gia },
            { where: { Id: v.Id }, transaction }
          );
        } else {
          await BienTheSanPham.create(
            {
              SanPhamId: id,
              Ten: v.Ten,
              Gia: v.Gia,
            },
            { transaction }
          );
        }
      }
    } else {
      if (product.BienTheSanPhams.length === 1) {
        await product.BienTheSanPhams[0].update(
          {
            Ten: sanPhamData.Ten,
            Gia: sanPhamData.Gia,
          },
          { transaction }
        );
      }
    }
    if (files?.length) {
      const images = files.map(f => ({
        SanPhamId: id,
        Url: f.path,
      }));
      await AnhSanPham.bulkCreate(images, { transaction });
    }

    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}


  static async delete(id) {
  const transaction = await sequelize.transaction();
  try {
    const product = await SanPham.findByPk(id, {
      include: [{ model: BienTheSanPham, as: "BienTheSanPhams" }],
      transaction,
    });

    if (!product) {
      await transaction.rollback();
      return null;
    }
    await BienTheSanPham.destroy({
      where: { SanPhamId: id },
      transaction,
    });

    await AnhSanPham.destroy({
      where: { SanPhamId: id },
      transaction,
    });
    await product.destroy({ transaction });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

}

module.exports = ProductService;
