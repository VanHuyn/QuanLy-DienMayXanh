const { ChiTietPhieuNhapNCC, PhieuNhapNCC } = require("../models");

exports.getByPhieu = async (phieuNhapId) => {
  const phieu = await PhieuNhapNCC.findByPk(phieuNhapId, {
    include: [
      {
        model: ChiTietPhieuNhapNCC,
        as: "ChiTietPhieuNhaps",
        include: ["BienTheSanPham"],
      },
    ],
  });

  if (!phieu) throw new Error("Phiếu nhập không tồn tại");

  return phieu;
};

exports.create = async (phieuNhapId, data) => {
  const phieu = await PhieuNhapNCC.findByPk(phieuNhapId);
  if (!phieu) throw new Error("Phiếu nhập không tồn tại");
  if (phieu.TrangThai !== "ChoNhap")
    throw new Error("Phiếu đã nhập kho hoặc đã huỷ");

  const detail = await ChiTietPhieuNhapNCC.create({
    PhieuNhapNCCId: phieuNhapId,
    BienTheSanPhamId: data.BienTheSanPhamId,
    SoLuong: data.SoLuong,
    DonGia: data.DonGia,
  });

  // Cập nhật tổng tiền
  const chiTiets = await ChiTietPhieuNhapNCC.findAll({
    where: { PhieuNhapNCCId: phieuNhapId },
  });
  const tong = chiTiets.reduce((sum, d) => sum + d.SoLuong * d.DonGia, 0);
  await phieu.update({ TongTien: tong });

  return detail;
};

exports.remove = async (id) => {
  const detail = await ChiTietPhieuNhapNCC.findByPk(id);
  if (!detail) throw new Error("Chi tiết không tồn tại");

  const phieu = await PhieuNhapNCC.findByPk(detail.PhieuNhapNCCId);
  if (phieu.TrangThai !== "ChoNhap")
    throw new Error("Phiếu đã nhập kho hoặc đã huỷ");

  await detail.destroy();

  const chiTiets = await ChiTietPhieuNhapNCC.findAll({
    where: { PhieuNhapNCCId: phieu.Id },
  });
  const tong = chiTiets.reduce((sum, d) => sum + d.SoLuong * d.DonGia, 0);
  await phieu.update({ TongTien: tong });

  return true;
};
