// BienTheSanPham.js
module.exports = (sequelize, DataTypes) => {
  const BienTheSanPham = sequelize.define(
    "BienTheSanPham",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      SanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      Ten: { type: DataTypes.STRING(200), allowNull: true },
      Gia: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    },
    { tableName: "BienTheSanPham", timestamps: true }
  );

  BienTheSanPham.associate = (models) => {
    BienTheSanPham.belongsTo(models.SanPham, {
      foreignKey: "SanPhamId",
      as: "SanPham",
    });
    BienTheSanPham.hasMany(models.ChiTietDonHang, {
      foreignKey: "BienTheSanPhamId",
      as: "ChiTietDonHangs",
    });
    BienTheSanPham.hasMany(models.ChiTietGioHang, {
      foreignKey: "BienTheSanPhamId",
      as: "ChiTietGioHangs",
    });
    BienTheSanPham.hasMany(models.TonKho, {
      foreignKey: "BienTheSanPhamId",
      as: "TonKhos",
    });
    BienTheSanPham.hasMany(models.ChiTietPhieuNhapXuatKho, {
      foreignKey: "BienTheSanPhamId",
      as: "ChiTietPhieuNXKs",
    });
    BienTheSanPham.belongsToMany(models.KhuyenMai, {
      through: models.KhuyenMaiBienTheSanPham,
      foreignKey: "BienTheSanPhamId",
      as: "KhuyenMais",
    });
    BienTheSanPham.hasMany(models.ChiTietPhieuNhapNCC, {
      foreignKey: "BienTheSanPhamId",
      as: "ChiTietPhieuNhapNCCs",
    });
  };

  return BienTheSanPham;
};
