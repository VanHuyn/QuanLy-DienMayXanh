// NguoiDung.js
// Model Sequelize cho bảng NguoiDung
// Tài khoản người dùng chung (Admin, Nhân viên, Khách hàng)

module.exports = (sequelize, DataTypes) => {
  const NguoiDung = sequelize.define('NguoiDung', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    HoTen: { type: DataTypes.STRING(200), allowNull: false, comment: 'Họ và tên' },
    Email: { type: DataTypes.STRING(200), allowNull: false, unique: true, comment: 'Email đăng nhập' },
    MatKhau: { type: DataTypes.STRING(255), allowNull: true, comment: 'Mật khẩu băm' },
    SoDienThoai: { type: DataTypes.STRING(50), allowNull: true },
    DiaChi: { type: DataTypes.STRING(500), allowNull: true },
    VaiTroId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, comment: 'FK -> VaiTro' },
    TrangThai: { type: DataTypes.ENUM('Active','Inactive','Locked'), defaultValue: 'Active' },
  }, { tableName: 'NguoiDung', timestamps: true });

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  const models = sequelize.models;
  try {
    if (models.KhachHang) NguoiDung.hasOne(models.KhachHang, { foreignKey: 'NguoiDungId', as: 'KhachHang' });
    if (models.NhanVien) NguoiDung.hasOne(models.NhanVien, { foreignKey: 'NguoiDungId', as: 'NhanVien' });
    if (models.VaiTro) NguoiDung.belongsTo(models.VaiTro, { foreignKey: 'VaiTroId', as: 'VaiTro' });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return NguoiDung;
};