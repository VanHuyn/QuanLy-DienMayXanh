// PhieuThanhToan.js
// Model Sequelize cho bảng PhieuThanhToan
// Ghi nhận thanh toán

module.exports = (sequelize, DataTypes) => {
  const PhieuThanhToan = sequelize.define('PhieuThanhToan', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    DonHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    SoTien: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
    PhuongThuc: { type: DataTypes.STRING(100), allowNull: true },
    NgayThanhToan: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    TrangThai: { type: DataTypes.ENUM('ThanhCong','ThatBai','DangCho'), defaultValue: 'DangCho' },
  }, { tableName: 'PhieuThanhToan', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.DonHang) PhieuThanhToan.belongsTo(models.DonHang, { foreignKey: 'DonHangId', as: 'DonHang' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return PhieuThanhToan;
};