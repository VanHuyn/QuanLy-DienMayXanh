// PhieuDoiTra.js
// Model Sequelize cho bảng PhieuDoiTra
// Phiếu đổi / trả hàng

module.exports = (sequelize, DataTypes) => {
  const PhieuDoiTra = sequelize.define('PhieuDoiTra', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    DonHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    KhachHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    LyDo: { type: DataTypes.STRING(500), allowNull: true },
    Ngay: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    TrangThai: { type: DataTypes.ENUM('ChoXuLy','DaXuLy','TuChoi'), defaultValue: 'ChoXuLy' },
  }, { tableName: 'PhieuDoiTra', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.DonHang) PhieuDoiTra.belongsTo(models.DonHang, { foreignKey: 'DonHangId', as: 'DonHang' });
    if (models.KhachHang) PhieuDoiTra.belongsTo(models.KhachHang, { foreignKey: 'KhachHangId', as: 'KhachHang' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return PhieuDoiTra;
};