// KhuyenMai.js
// Model Sequelize cho bảng KhuyenMai
// Chương trình khuyến mãi

module.exports = (sequelize, DataTypes) => {
  const KhuyenMai = sequelize.define('KhuyenMai', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ma: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    Ten: { type: DataTypes.STRING(255), allowNull: false },
    PhanTramGiam: { type: DataTypes.FLOAT, allowNull: true },
    NgayBatDau: { type: DataTypes.DATE, allowNull: true },
    NgayKetThuc: { type: DataTypes.DATE, allowNull: true },
    ApDungChoTatCa: { type: DataTypes.BOOLEAN, defaultValue:  false },
  }, { tableName: 'KhuyenMai', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return KhuyenMai;
};