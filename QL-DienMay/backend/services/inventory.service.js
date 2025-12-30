const { TonKho, sequelize, khoChiNhanh } = require("../models");

const InventoryService = {
  getAll: async () => {
    return await TonKho.findAll({
      include: [
        {
          association: "BienThe",
          include: [
            {
              association: "SanPham",
              include: [
                {
                  association: "AnhSanPhams",
                  required: false,
                  separate: true,
                  order: [
                    ["LaChinh", "DESC"],
                    ["createdAt", "ASC"],
                  ],
                },
              ],
            },
          ],
        },
        "KhoTong",
        "KhoChiNhanh",
      ],
      order: [["updatedAt", "DESC"]],
    });
  },
getByKhoChiNhanh: async (khoChiNhanhId) => {
  return await TonKho.findAll({
    where: {
      KhoChiNhanhId: khoChiNhanhId,
    },
    include: [
      {
        association: "BienThe",
        include: [
          {
            association: "SanPham",
            include: [
              {
                association: "AnhSanPhams",
                required: false,
              },
            ],
          },
        ],
      },
      {
        association: "KhoChiNhanh",
      },
    ],
    order: [["updatedAt", "DESC"]],
  });
},


  exportFromKhoTongToChiNhanh: async ({
    BienTheSanPhamId,
    khoTongId,
    khoChiNhanhId,
    soLuong,
    nguoiDungId,
  }) => {
    return await sequelize.transaction(async (t) => {
      // 1️⃣ Lấy tồn kho tổng
      const tonKhoTong = await TonKho.findOne({
        where: {
          BienTheSanPhamId: BienTheSanPhamId,
          KhoTongId: khoTongId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!tonKhoTong || tonKhoTong.SoLuong < soLuong) {
        throw new Error("Tồn kho tổng không đủ");
      }

      // 2️⃣ Trừ kho tổng
      tonKhoTong.SoLuong -= soLuong;
      await tonKhoTong.save({ transaction: t });

      // 3️⃣ Tìm tồn kho chi nhánh
      let tonKhoChiNhanh = await TonKho.findOne({
        where: {
          BienTheSanPhamId: BienTheSanPhamId,
          KhoChiNhanhId: khoChiNhanhId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      // 4️⃣ Nếu chưa có → tạo mới
      if (!tonKhoChiNhanh) {
        tonKhoChiNhanh = await TonKho.create(
          {
            BienTheSanPhamId: BienTheSanPhamId,
            KhoChiNhanhId: khoChiNhanhId,
            SoLuong: soLuong,
          },
          { transaction: t }
        );
      } else {
        tonKhoChiNhanh.SoLuong += soLuong;
        await tonKhoChiNhanh.save({ transaction: t });
      }

      return {
        message: "Xuất kho thành công",
        tonKhoTong,
        tonKhoChiNhanh,
      };
    });
  },
};

module.exports = InventoryService;
