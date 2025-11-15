// PhieuNhapNCC.js
// Model Sequelize cho bảng PhieuNhapNCC
// Đơn nhập hàng từ nhà cung cấp vào kho tổng

module.exports = (sequelize, DataTypes) => {
  const PhieuNhapNCC = sequelize.define('PhieuNhapNCC', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    NhaCungCapId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    NgayDat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    TongTien: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
    TrangThai: { type: DataTypes.ENUM('ChoNhap','DaNhap','Huy'), defaultValue: 'ChoNhap' },
  }, { tableName: 'PhieuNhapNCC', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.NhaCungCap) PhieuNhapNCC.belongsTo(models.NhaCungCap, { foreignKey: 'NhaCungCapId', as: 'NhaCungCap' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return PhieuNhapNCC;
};