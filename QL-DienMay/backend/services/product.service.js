const {
  SanPham,
  AnhSanPham,
  DanhMuc,
  BienTheSanPham,
  sequelize,
  KhoChiNhanh,
  TonKho,
} = require("../models");
const { Op, fn, col, where } = require("sequelize");

class ProductService {
  static async create(data, files) {
    try {
      const { BienTheSanPhams = [], ...sanPhamData } = data;
      const transaction = await sequelize.transaction();
      let product;
      try {
        product = await SanPham.create(sanPhamData, { transaction });

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
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }

      if (files?.length) {
        const images = files.map((f) => ({
          SanPhamId: product.Id,
          Url: f.path, // cloudinary url
        }));
        await AnhSanPham.bulkCreate(images);
      }

      return product;
    } catch (error) {
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
  static async getByCategory(categoryId, branchId) {
    return await SanPham.findAll({
      where: {
        DanhMucId: categoryId,
        TrangThai: "DangBan",
      },
      include: [
        {
          model: BienTheSanPham,
          as: "BienTheSanPhams",
          required: false,
          include: [
            {
              model: TonKho,
              as: "TonKhos",
              required: true,
              where: {
                KhoChiNhanhId: branchId,
                SoLuong: { [Op.gt]: 0 },
              },
            },
          ],
        },
        {
          model: AnhSanPham,
          as: "AnhSanPhams",
          where: { LaChinh: true },
          required: false,
        },
      ],
      distinct: true,
      order: [["createdAt", "DESC"]],
    });
  }
  static async getByCategorySlug(slug, branchId) {
    const branchIdNum = Number(branchId);
    if (!branchIdNum) {
      throw new Error("branchId không hợp lệ");
    }

    return await SanPham.findAll({
      where: { TrangThai: "DangBan" },
      include: [
        {
          model: DanhMuc,
          as: "DanhMuc",
          required: true,
          where: where(fn("lower", col("DanhMuc.Slug")), slug.toLowerCase()),
        },
        {
          model: BienTheSanPham,
          as: "BienTheSanPhams",
          required: true,
          include: [
            {
              model: TonKho,
              as: "TonKhos",
              required: true,
              where: { SoLuong: { [Op.gt]: 0 } },
              include: [
                {
                  model: KhoChiNhanh,
                  as: "KhoChiNhanh",
                  required: true,
                  where: { ChiNhanhId: branchIdNum },
                },
              ],
            },
          ],
        },
        {
          model: AnhSanPham,
          as: "AnhSanPhams",
          required: false,
          where: { LaChinh: true },
        },
      ],
      distinct: true,
      order: [["createdAt", "DESC"]],
    });
  }

  static async update(id, data, files) {
    const transaction = await sequelize.transaction();
    try {
      const { BienTheSanPhams, ...sanPhamData } = data;

      let bienTheList = [];
      if (BienTheSanPhams) {
        if (typeof BienTheSanPhams === "string") {
          bienTheList = JSON.parse(BienTheSanPhams);
        } else if (Array.isArray(BienTheSanPhams)) {
          bienTheList = BienTheSanPhams;
        }
      }

      const product = await SanPham.findByPk(id, {
        include: [{ model: BienTheSanPham, as: "BienTheSanPhams" }],
        transaction,
      });

      if (!product) {
        await transaction.rollback();
        return null;
      }

      await product.update(sanPhamData, { transaction });

      if (bienTheList.length) {
        const currentVariants = product.BienTheSanPhams;

        const incomingIds = bienTheList.filter((v) => v.Id).map((v) => v.Id);

        for (const v of currentVariants) {
          if (!incomingIds.includes(v.Id)) {
            await v.destroy({ transaction });
          }
        }

        for (const v of bienTheList) {
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
      } else if (product.BienTheSanPhams.length === 1) {
        await product.BienTheSanPhams[0].update(
          {
            Ten: sanPhamData.Ten,
            Gia: sanPhamData.Gia,
          },
          { transaction }
        );
      }

      if (files?.length) {
        await AnhSanPham.destroy({
          where: { SanPhamId: id },
          transaction,
        });
        await AnhSanPham.bulkCreate(
          files.map((f, index) => ({
            SanPhamId: id,
            Url: f.path,
            LaChinh: index === 0,
          })),
          { transaction }
        );
      }

      await transaction.commit();
      return product;
    } catch (err) {
      await transaction.rollback();
      throw err;
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
