// ChiNhanh.js
// Model Sequelize cho bảng ChiNhanh
// Thông tin các chi nhánh

module.exports = (sequelize, DataTypes) => {
  const ChiNhanh = sequelize.define('ChiNhanh', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(255), allowNull: false },
    Ma: { type: DataTypes.STRING(50), allowNull: true, unique: true },
    DiaChi: { type: DataTypes.STRING(500), allowNull: true },
    SoDienThoai: { type: DataTypes.STRING(50), allowNull: true },
    Email: { type: DataTypes.STRING(200), allowNull: true },
  }, { tableName: 'ChiNhanh', timestamps: true });

  ChiNhanh.associate = (models) => {
    ChiNhanh.hasMany(models.NhanVien, {
      foreignKey: "ChiNhanhId",
      as: "NhanViens",
    });

    // ⭐ DÒNG QUAN TRỌNG NHẤT
    ChiNhanh.hasOne(models.KhoChiNhanh, {
      foreignKey: "ChiNhanhId",
      as: "KhoChiNhanh",
    });
  };

  return ChiNhanh;
};