// KhachHang.js
// Model Sequelize cho bảng KhachHang
// Thông tin khách hàng mở rộng

module.exports = (sequelize, DataTypes) => {
  const KhachHang = sequelize.define('KhachHang', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    NguoiDungId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, comment: 'FK -> NguoiDung' },
    NgayDangKy: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DiemTichLuy: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  }, { tableName: 'KhachHang', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.NguoiDung) KhachHang.belongsTo(models.NguoiDung, { foreignKey: 'NguoiDungId', as: 'NguoiDung' });
    if (models.GioHang) KhachHang.hasOne(models.GioHang, { foreignKey: 'KhachHangId', as: 'GioHang' });
    if (models.DonHang) KhachHang.hasMany(models.DonHang, { foreignKey: 'KhachHangId', as: 'DonHangs' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return KhachHang;
};