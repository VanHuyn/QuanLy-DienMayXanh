// AnhSanPham.js
// Model Sequelize cho bảng AnhSanPham
// Ảnh sản phẩm

module.exports = (sequelize, DataTypes) => {
  const AnhSanPham = sequelize.define('AnhSanPham', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    SanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    Url: { type: DataTypes.STRING(1000), allowNull: false },
    LaChinh: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, { tableName: 'AnhSanPham', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.SanPham) AnhSanPham.belongsTo(models.SanPham, { foreignKey: 'SanPhamId', as: 'SanPham' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return AnhSanPham;
};