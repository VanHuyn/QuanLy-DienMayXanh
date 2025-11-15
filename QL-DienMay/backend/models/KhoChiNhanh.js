module.exports = (sequelize, DataTypes) => {
  const KhoChiNhanh = sequelize.define('KhoChiNhanh', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    ChiNhanhId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    Ten: { type: DataTypes.STRING(255), allowNull: true },
    DiaChi: { type: DataTypes.STRING(500), allowNull: true },
  }, { tableName: 'KhoChiNhanh', timestamps: true });

  KhoChiNhanh.associate = models => {
    KhoChiNhanh.belongsTo(models.ChiNhanh, { foreignKey: 'ChiNhanhId', as: 'ChiNhanh' });
    KhoChiNhanh.hasMany(models.TonKho, { foreignKey: 'KhoChiNhanhId', as: 'TonKhos' });
  };

  return KhoChiNhanh;
};
