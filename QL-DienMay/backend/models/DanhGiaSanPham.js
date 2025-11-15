// DanhGiaSanPham.js
// Model Sequelize cho bảng DanhGiaSanPham
// Đánh giá sản phẩm

module.exports = (sequelize, DataTypes) => {
  const DanhGiaSanPham = sequelize.define('DanhGiaSanPham', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    SanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    KhachHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    SoSao: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    NoiDung: { type: DataTypes.TEXT, allowNull: true },
    Ngay: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { tableName: 'DanhGiaSanPham', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.SanPham) DanhGiaSanPham.belongsTo(models.SanPham, { foreignKey: 'SanPhamId', as: 'SanPham' });
    if (models.KhachHang) DanhGiaSanPham.belongsTo(models.KhachHang, { foreignKey: 'KhachHangId', as: 'KhachHang' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return DanhGiaSanPham;
};