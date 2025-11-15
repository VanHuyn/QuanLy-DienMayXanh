// ChiTietPhieuNhapNCC.js
module.exports = (sequelize, DataTypes) => {
  const ChiTietPhieuNhapNCC = sequelize.define('ChiTietPhieuNhapNCC', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    PhieuNhapNCCId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    BienTheSanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    SoLuong: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    DonGia: { type: DataTypes.DECIMAL(15,2), allowNull: true },
  }, { tableName: 'ChiTietPhieuNhapNCC', timestamps: true });

  ChiTietPhieuNhapNCC.associate = models => {
    ChiTietPhieuNhapNCC.belongsTo(models.PhieuNhapNCC, { foreignKey: 'PhieuNhapNCCId', as: 'PhieuNhapNCC' });
    ChiTietPhieuNhapNCC.belongsTo(models.BienTheSanPham, { foreignKey: 'BienTheSanPhamId', as: 'BienTheSanPham' });
  };

  return ChiTietPhieuNhapNCC;
};
