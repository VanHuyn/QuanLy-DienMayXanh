// ChiTietGioHang.js
// Model Sequelize cho bảng ChiTietGioHang
// Chi tiết giỏ hàng

module.exports = (sequelize, DataTypes) => {
  const ChiTietGioHang = sequelize.define(
    "ChiTietGioHang",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      GioHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      BienTheSanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      SoLuong: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1 },
    },
    { tableName: "ChiTietGioHang", timestamps: true }
  );

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  ChiTietGioHang.associate = (models) => {
    ChiTietGioHang.belongsTo(models.GioHang, {
      foreignKey: "GioHangId",
      as: "GioHang",
    });
    ChiTietGioHang.belongsTo(models.BienTheSanPham, {
      foreignKey: "BienTheSanPhamId",
      as: "BienTheSanPham",
    });
  };

  return ChiTietGioHang;
};
