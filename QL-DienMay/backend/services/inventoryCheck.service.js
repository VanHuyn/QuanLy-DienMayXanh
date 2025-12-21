const {
  TonKho,
  PhieuNhapXuatKho,
  ChiTietPhieuNhapXuatKho,
  sequelize,
} = require("../models");

const InventoryCheckService = {
  adjust: async (data, user) => {
    const { KhoTongId, GhiChu, ChiTiet } = data;

    if (!ChiTiet || ChiTiet.length === 0) {
      throw new Error("Không có dữ liệu kiểm kê");
    }

    return await sequelize.transaction(async (t) => {
      let coChenhLech = false;

      const phieu = await PhieuNhapXuatKho.create(
        {
          Loai: "DieuChinh",
          NoiGui: `KhoTong:${KhoTongId}`,
          NhanVienId: user.userId,
          GhiChu,
        },
        { transaction: t }
      );

      for (const item of ChiTiet) {
        const tonKho = await TonKho.findOne({
          where: {
            BienTheSanPhamId: item.BienTheSanPhamId,
            KhoTongId,
          },
          transaction: t,
        });

        if (!tonKho) continue;

        const soLuongHeThong = Number(tonKho.SoLuong);
        const soLuongThucTe = Number(item.SoLuongThucTe);

        if (Number.isNaN(soLuongThucTe)) continue;

        const chenhLech = soLuongThucTe - soLuongHeThong;
        if (chenhLech === 0) continue;

        coChenhLech = true;

        await ChiTietPhieuNhapXuatKho.create(
          {
            PhieuNhapXuatKhoId: phieu.Id,
            BienTheSanPhamId: item.BienTheSanPhamId,
            SoLuong: Math.abs(chenhLech),
            Loai: chenhLech > 0 ? "Nhap" : "Xuat",
          },
          { transaction: t }
        );
        await tonKho.update(
          { SoLuong: soLuongThucTe },
          { transaction: t }
        );
      }

      if (!coChenhLech) {
        throw new Error("Không có chênh lệch tồn kho để điều chỉnh");
      }

      return phieu;
    });
  },
};

module.exports = InventoryCheckService;
