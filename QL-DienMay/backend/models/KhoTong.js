module.exports = (sequelize, DataTypes) => {
  const KhoTong = sequelize.define('KhoTong', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(255), allowNull: true },
    DiaChi: { type: DataTypes.STRING(500), allowNull: true },
  }, { tableName: 'KhoTong', timestamps: true });

  KhoTong.associate = models => {
    KhoTong.hasMany(models.PhieuNhapXuatKho, { foreignKey: 'NoiGui', sourceKey: 'Id', as: 'PhieuNhapXuats' });
    KhoTong.hasMany(models.TonKho, { foreignKey: 'KhoTongId', as: 'TonKhos' });
  };

  return KhoTong;
};
