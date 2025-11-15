// DonViTinh.js
// Model Sequelize cho bảng DonViTinh
// Đơn vị tính

module.exports = (sequelize, DataTypes) => {
  const DonViTinh = sequelize.define('DonViTinh', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(50), allowNull: false },
  }, { tableName: 'DonViTinh', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.SanPham) DonViTinh.hasMany(models.SanPham, { foreignKey: 'DonViTinhId', as: 'SanPhams' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return DonViTinh;
};