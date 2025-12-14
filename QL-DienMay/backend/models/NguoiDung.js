module.exports = (sequelize, DataTypes) => {
  const NguoiDung = sequelize.define('NguoiDung', {
    Id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    HoTen: { type: DataTypes.STRING(200), allowNull: false },
    Email: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    MatKhau: { type: DataTypes.STRING(255) },
    SoDienThoai: { type: DataTypes.STRING(50) },
    DiaChi: { type: DataTypes.STRING(500) },
    VaiTroId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    TrangThai: { type: DataTypes.ENUM('Active','Inactive','Locked'), defaultValue: 'Active' },
  }, { tableName: 'NguoiDung', timestamps: true });

  // 🔥 Định nghĩa quan hệ CHUẨN
  NguoiDung.associate = (models) => {
    NguoiDung.belongsTo(models.VaiTro, { foreignKey: 'VaiTroId', as: 'VaiTro' });
    NguoiDung.hasOne(models.KhachHang, { foreignKey: 'NguoiDungId', as: 'KhachHang' });
    NguoiDung.hasOne(models.NhanVien, { foreignKey: 'NguoiDungId', as: 'NhanVien' });
  };

  return NguoiDung;
};