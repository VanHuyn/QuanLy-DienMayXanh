// KhachHang.js
// Model Sequelize cho bảng KhachHang
// Thông tin khách hàng mở rộng

module.exports = (sequelize, DataTypes) => {
  const KhachHang = sequelize.define(
    "KhachHang",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      NguoiDungId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "FK -> NguoiDung",
      },
      NgayDangKy: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      DiemTichLuy: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    },
    { tableName: "KhachHang", timestamps: true }
  );

  KhachHang.associate = (models) => {
    KhachHang.belongsTo(models.NguoiDung, {
      foreignKey: "NguoiDungId",
      as: "NguoiDung",
    });
    KhachHang.hasOne(models.GioHang, {
      foreignKey: "KhachHangId",
      as: "GioHang",
    });
    KhachHang.hasMany(models.DonHang, {
      foreignKey: "KhachHangId",
      as: "DonHangs",
    });
  };
  return KhachHang;
};
