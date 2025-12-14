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
      unique: true
    },
    MoTa: { type: DataTypes.TEXT },
  }, { tableName: 'VaiTro', timestamps: true });

  // 🔥 định nghĩa quan hệ chuẩn
  VaiTro.associate = (models) => {
    VaiTro.hasMany(models.NguoiDung, { foreignKey: 'VaiTroId', as: 'NguoiDungs' });
  };

  return VaiTro;
};
