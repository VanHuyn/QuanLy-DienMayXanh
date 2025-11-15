// DanhMuc.js
// Model Sequelize cho bảng DanhMuc
// Danh mục sản phẩm

module.exports = (sequelize, DataTypes) => {
  const DanhMuc = sequelize.define('DanhMuc', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(200), allowNull: false },
    MoTa: { type: DataTypes.TEXT, allowNull: true },
  }, { tableName: 'DanhMuc', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.SanPham) DanhMuc.hasMany(models.SanPham, { foreignKey: 'DanhMucId', as: 'SanPhams' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return DanhMuc;
};