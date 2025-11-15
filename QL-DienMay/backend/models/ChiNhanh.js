// ChiNhanh.js
// Model Sequelize cho bảng ChiNhanh
// Thông tin các chi nhánh

module.exports = (sequelize, DataTypes) => {
  const ChiNhanh = sequelize.define('ChiNhanh', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { type: DataTypes.STRING(255), allowNull: false },
    Ma: { type: DataTypes.STRING(50), allowNull: true, unique: true },
    DiaChi: { type: DataTypes.STRING(500), allowNull: true },
    SoDienThoai: { type: DataTypes.STRING(50), allowNull: true },
    Email: { type: DataTypes.STRING(200), allowNull: true },
  }, { tableName: 'ChiNhanh', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.NhanVien) ChiNhanh.hasMany(models.NhanVien, { foreignKey: 'ChiNhanhId', as: 'NhanViens' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return ChiNhanh;
};