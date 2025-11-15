// KhuyenMaiBienTheSanPham.js
module.exports = (sequelize, DataTypes) => {
  const KhuyenMaiBienTheSanPham = sequelize.define('KhuyenMaiBienTheSanPham', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    KhuyenMaiId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    BienTheSanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  }, { tableName: 'KhuyenMaiBienTheSanPham', timestamps: true });

  KhuyenMaiBienTheSanPham.associate = models => {
    KhuyenMaiBienTheSanPham.belongsTo(models.KhuyenMai, { foreignKey: 'KhuyenMaiId', as: 'KhuyenMai' });
    KhuyenMaiBienTheSanPham.belongsTo(models.BienTheSanPham, { foreignKey: 'BienTheSanPhamId', as: 'BienTheSanPham' });
  };

  return KhuyenMaiBienTheSanPham;
};
