const {
  PhieuNhapNCC,
  ChiTietPhieuNhapNCC,
  TonKho,
  sequelize,
} = require("../models");

const ReceiptNccService = {
  getAll: async () => {
    return await PhieuNhapNCC.findAll({
      include: ["NhaCungCap", "KhoTong", "ChiTietPhieuNhaps"],
      order: [["createdAt", "DESC"]],
    });
  },

  getById: async (id) => {
    return await PhieuNhapNCC.findByPk(id, {
      include: ["NhaCungCap", "KhoTong", "ChiTietPhieuNhaps"],
    });
  },

  // Tạo phiếu nhập + chi tiết
  create: async (data) => {
    const { ChiTietPhieuNhaps, ...phieuData } = data;
      if (!ChiTietPhieuNhaps || ChiTietPhieuNhaps.length === 0)
      throw new Error("Phiếu nhập phải có ít nhất một sản phẩm");
    return await sequelize.transaction(async (t) => {
      const phieu = await PhieuNhapNCC.create(phieuData, { transaction: t });

      let tongTien = 0;

      if (ChiTietPhieuNhaps && ChiTietPhieuNhaps.length > 0) {
        for (const ct of ChiTietPhieuNhaps) {
          await ChiTietPhieuNhapNCC.create(
            {
              ...ct,
              PhieuNhapNCCId: phieu.Id,
            },
            { transaction: t }
          );
          tongTien += ct.SoLuong * ct.DonGia;
        }
      }

      await phieu.update({ TongTien: tongTien }, { transaction: t });
      return phieu;
    });
  },

  // Xác nhận nhập kho → cập nhật tồn kho
  confirm: async (id) => {
    return await sequelize.transaction(async (t) => {
      const phieu = await PhieuNhapNCC.findByPk(id, {
        include: ["ChiTietPhieuNhaps"],
        transaction: t,
      });

      if (!phieu) throw new Error("Phiếu nhập không tồn tại");
      if (phieu.TrangThai !== "ChoNhap")
        throw new Error("Phiếu không ở trạng thái chờ nhập");

      for (const ct of phieu.ChiTietPhieuNhaps) {
        const [tonKho] = await TonKho.findOrCreate({
          where: {
            BienTheSanPhamId: ct.BienTheSanPhamId,
            KhoTongId: phieu.KhoTongId,
          },
          defaults: { SoLuong: 0 },
          transaction: t,
        });

        await tonKho.increment("SoLuong", { by: ct.SoLuong, transaction: t });
      }

      await phieu.update(
        { TrangThai: "DaNhap", NgayNhap: new Date() },
        { transaction: t }
      );

      return phieu;
    });
  },

  cancel: async (id) => {
    const phieu = await PhieuNhapNCC.findByPk(id);
    if (!phieu) throw new Error("Phiếu không tồn tại");
    if (phieu.TrangThai !== "ChoNhap")
      throw new Error("Không thể huỷ phiếu đã nhập");

    await phieu.update({ TrangThai: "Huy" });
    return true;
  },
};

module.exports = ReceiptNccService;
