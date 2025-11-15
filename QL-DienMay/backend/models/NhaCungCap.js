// NhaCungCap.js
// Model Sequelize cho bảng NhaCungCap
// Nhà cung cấp

module.exports = (sequelize, DataTypes) => {
  const NhaCungCap = sequelize.define('NhaCungCap', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(255), allowNull: false },
    DiaChi: { type: DataTypes.STRING(500), allowNull: true },
    SoDienThoai: { type: DataTypes.STRING(50), allowNull: true },
    Email: { type: DataTypes.STRING(200), allowNull: true },
  }, { tableName: 'NhaCungCap', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.PhieuNhapNCC) NhaCungCap.hasMany(models.PhieuNhapNCC, { foreignKey: 'NhaCungCapId', as: 'PhieuNhapNCCs' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return NhaCungCap;
};