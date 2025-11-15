// NhanVien.js
// Thông tin chi tiết của nhân viên (liên kết với NguoiDung và ChiNhanh)

module.exports = (sequelize, DataTypes) => {
  const NhanVien = sequelize.define('NhanVien', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    NguoiDungId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, comment: 'FK -> NguoiDung' },
    ChiNhanhId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, comment: 'FK -> ChiNhanh' },
    MaNhanVien: { type: DataTypes.STRING(50), allowNull: true, unique: true, comment: 'Mã nhân viên' },
    ChucVu: {
      type: DataTypes.ENUM(
        'QuanLy',
        'NhanVienBanHang',
        'NhanVienKhoTong',
        'NhanVienKhoChiNhanh'
      ),
      allowNull: true,
      comment: 'Chức vụ cụ thể trong hệ thống'
    },
    NgayTuyenDung: { type: DataTypes.DATE, allowNull: true, comment: 'Ngày tuyển dụng' },
  }, { tableName: 'NhanVien', timestamps: true });

  // Quan hệ
  const models = sequelize.models;
  try {
    if (models.NguoiDung)
      NhanVien.belongsTo(models.NguoiDung, { foreignKey: 'NguoiDungId', as: 'NguoiDung' });

    if (models.ChiNhanh)
      NhanVien.belongsTo(models.ChiNhanh, { foreignKey: 'ChiNhanhId', as: 'ChiNhanh' });
  } catch (e) {}

  return NhanVien;
};
