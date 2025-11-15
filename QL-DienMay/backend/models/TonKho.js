module.exports = (sequelize, DataTypes) => {
  const TonKho = sequelize.define('TonKho', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    BienTheSanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    KhoTongId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    KhoChiNhanhId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    SoLuong: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  }, { tableName: 'TonKho', timestamps: true });

  TonKho.associate = models => {
    TonKho.belongsTo(models.BienTheSanPham, { foreignKey: 'BienTheSanPhamId', as: 'BienThe' });
    TonKho.belongsTo(models.KhoTong, { foreignKey: 'KhoTongId', as: 'KhoTong' });
    TonKho.belongsTo(models.KhoChiNhanh, { foreignKey: 'KhoChiNhanhId', as: 'KhoChiNhanh' });
  };

  return TonKho;
};
