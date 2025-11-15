// GioHang.js
// Model Sequelize cho bảng GioHang
// Giỏ hàng tạm cho khách

module.exports = (sequelize, DataTypes) => {
  const GioHang = sequelize.define(
    "GioHang",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      KhachHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      NgayTao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "GioHang", timestamps: true }
  );

  GioHang.associate = (models) => {
    GioHang.belongsTo(models.KhachHang, {
      foreignKey: "KhachHangId",
      as: "KhachHang",
    });
    GioHang.hasMany(models.ChiTietGioHang, {
      foreignKey: "GioHangId",
      as: "ChiTietGioHangs",
    });
    GioHang.belongsToMany(models.BienTheSanPham, {
      through: models.ChiTietGioHang,
      foreignKey: "GioHangId",
      as: "BienTheSanPhams",
    });
  };
  return GioHang;
};
