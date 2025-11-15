// ChiTietPhieuNhapXuatKho.js
module.exports = (sequelize, DataTypes) => {
  const ChiTietPhieuNhapXuatKho = sequelize.define(
    "ChiTietPhieuNhapXuatKho",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      PhieuNhapXuatKhoId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      BienTheSanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      SoLuong: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    },
    { tableName: "ChiTietPhieuNhapXuatKho", timestamps: true }
  );

  ChiTietPhieuNhapXuatKho.associate = (models) => {
    ChiTietPhieuNhapXuatKho.belongsTo(models.PhieuNhapXuatKho, {
      foreignKey: "PhieuNhapXuatKhoId",
      as: "PhieuNhapXuatKho",
    });
    ChiTietPhieuNhapXuatKho.belongsTo(models.BienTheSanPham, {
      foreignKey: "BienTheSanPhamId",
      as: "BienTheSanPham",
    });
  };

  return ChiTietPhieuNhapXuatKho;
};
