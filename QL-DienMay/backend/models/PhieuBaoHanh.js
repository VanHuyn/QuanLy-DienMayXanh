// PhieuBaoHanh.js
// Model Sequelize cho bảng PhieuBaoHanh
// Phiếu bảo hành / yêu cầu sửa chữa

module.exports = (sequelize, DataTypes) => {
  const PhieuBaoHanh = sequelize.define('PhieuBaoHanh', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    DonHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    KhachHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    SanPhamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    NgayGui: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    TrangThai: { type: DataTypes.ENUM('Moi','DangXuLy','DaHoanThanh'), defaultValue: 'Moi' },
  }, { tableName: 'PhieuBaoHanh', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.DonHang) PhieuBaoHanh.belongsTo(models.DonHang, { foreignKey: 'DonHangId', as: 'DonHang' });
    if (models.KhachHang) PhieuBaoHanh.belongsTo(models.KhachHang, { foreignKey: 'KhachHangId', as: 'KhachHang' });
    if (models.SanPham) PhieuBaoHanh.belongsTo(models.SanPham, { foreignKey: 'SanPhamId', as: 'SanPham' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return PhieuBaoHanh;
};