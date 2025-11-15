// VaiTro.js
module.exports = (sequelize, DataTypes) => {
  const VaiTro = sequelize.define('VaiTro', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    Ten: { 
      type: DataTypes.ENUM(
        'Admin',
        'QuanLy',
        'NhanVienBanHang',
        'NhanVienKhoTong',
        'NhanVienKhoChiNhanh',
        'KhachHang',
        'KhachVangLai'
      ),
      allowNull: false,
      unique: true,
      comment: 'Tên vai trò trong hệ thống'
    },
    MoTa: { type: DataTypes.TEXT, allowNull: true },
  }, { tableName: 'VaiTro', timestamps: true });

  const models = sequelize.models;
  try {
    if (models.NguoiDung) VaiTro.hasMany(models.NguoiDung, { foreignKey: 'VaiTroId', as: 'NguoiDungs' });
  } catch (e) {}

  return VaiTro;
};
