// SanPham.js
module.exports = (sequelize, DataTypes) => {
  const SanPham = sequelize.define('SanPham', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(300), allowNull: false },
    SKU: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    MoTa: { type: DataTypes.TEXT, allowNull: true },
    Gia: { type: DataTypes.DECIMAL(15,2), allowNull: false, defaultValue: 0 },
    DanhMucId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    DonViTinhId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    TrangThai: { type: DataTypes.ENUM('DangBan','TamNgung','HetHang'), defaultValue: 'DangBan' },
  }, { tableName: 'SanPham', timestamps: true });

  SanPham.associate = models => {
    SanPham.belongsTo(models.DanhMuc, { foreignKey: 'DanhMucId', as: 'DanhMuc' });
    SanPham.belongsTo(models.DonViTinh, { foreignKey: 'DonViTinhId', as: 'DonViTinh' });
    SanPham.hasMany(models.BienTheSanPham, { foreignKey: 'SanPhamId', as: 'BienTheSanPhams' });
    SanPham.hasMany(models.AnhSanPham, { foreignKey: 'SanPhamId', as: 'AnhSanPhams' });
    SanPham.hasMany(models.DanhGiaSanPham, { foreignKey: 'SanPhamId', as: 'DanhGias' });
    SanPham.hasMany(models.PhieuBaoHanh, { foreignKey: 'SanPhamId', as: 'PhieuBaoHanhs' });
    SanPham.hasMany(models.ChiTietDonHang, { foreignKey: 'SanPhamId', as: 'ChiTietDonHangs' });
  };

  return SanPham;
};
