// ChiTietDonHang.js
// Model Sequelize cho bảng ChiTietDonHang
// Chi tiết đơn hàng

module.exports = (sequelize, DataTypes) => {
  const ChiTietDonHang = sequelize.define(
    "ChiTietDonHang",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      DonHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      BienTheSanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      SoLuong: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1 },
      DonGia: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    },
    { tableName: "ChiTietDonHang", timestamps: true }
  );

  ChiTietDonHang.associate = (models) => {
    ChiTietDonHang.belongsTo(models.DonHang, {
      foreignKey: "DonHangId",
      as: "DonHang",
    });
    ChiTietDonHang.belongsTo(models.BienTheSanPham, {
      foreignKey: "BienTheSanPhamId",
      as: "BienTheSanPham",
    });
    ChiTietDonHang.belongsTo(models.SanPham, {
      foreignKey: "SanPhamId",
      as: "SanPham",
    }); // trực tiếp
  };

  return ChiTietDonHang;
};
